import React, { useEffect, useRef, useState } from "react"
import {
  ActivityIndicator,
  View,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native"
import Svg, {
  Circle,
  G,
  Line,
  Text as SVGText,
  Image,
  ClipPath,
} from "react-native-svg"

import styles from "./styles"
import Graph, {
  getInitialized,
  getLinks,
  getNodeById,
  getNodes,
  Link,
  Node,
  setInitialized,
} from "../Graph"
import { fruchtermanReingold } from "../graphAlgorithms/FruchtermanReingold"

import {
  PanGestureHandler,
  PinchGestureHandler,
  State,
  GestureHandlerRootView,
} from "react-native-gesture-handler"

import { black, peach, transparent } from "../../../assets/colors/colors"
import { globalStyles } from "../../../assets/global/globalStyles"

const VERY_SHORT_PRESS_DURATION = 50
const SHORT_PRESS_DURATION = 100
const DEFAULT_NODE_SIZE = 40 // Default size of the nodes
const NODE_HIGHLIGHT_RATIO = 1.3
const NODE_TEXT_OFFSET = 20

const DEFAULT_LINK_COLOR = black // Default color of the links
const DEFAULT_CLICKED_NODE_ID = ""
const INITIAL_SCALE = 1 // Initial scale of the graph
const MAX_ITERATIONS = 1000 // Maximum number of iterations for the used algorithn

const WIDTH = Dimensions.get("window").width // Width of the screen
const HEIGHT = Dimensions.get("window").height // Height of the screen
const CENTER_WIDTH = WIDTH / 2 // Center X-coordinates of the screen
const CENTER_HEIGHT = HEIGHT / 2 // Center Y-coordinates of the screen

const TARGET_SCALE = 2 // Target scale for zooming in
const ANIMATION_DURATION = 500 // Duration of the animation in milliseconds
const FPS = 60 // Number of frames per second for smooth animation
const TOTAL_FRAMES = FPS * (ANIMATION_DURATION / 1000) // Total number of frames

const PAN_GESTURE_MIN_MAX_POINTERS = 1 // Minimum and maximum number of pointers for the pan gesture

/**
 *
 * @description Force-directed graph component
 * @param graph - Graph object
 * @param constrainedNodeId - Identifier of the node to be constrained to the center
 * @returns - Force-directed graph component
 */
const ForceDirectedGraph: React.FC<{
  graph: Graph
  constrainedNodeId: string
  onModalPress: (uid: string) => void
}> = ({ graph, constrainedNodeId, onModalPress }) => {
  // States to store the nodes, links, sizes and loading status
  const [nodes, setNodes] = useState<Node[]>([])
  const [links, setLinks] = useState<Link[]>([])
  const [load, setLoad] = useState<boolean>(false)

  // State to store the total offset when dragging the graph
  const [totalOffset, setTotalOffset] = useState({ x: 0, y: 0 })
  const [clickedNodeID, setClickedNodeID] = useState<string>(
    DEFAULT_CLICKED_NODE_ID
  ) // Node ID of clicked node
  const [scale, setScale] = useState(INITIAL_SCALE)
  const [lastScale, setLastScale] = useState(INITIAL_SCALE) // Add state to keep track of last scale

  const [gestureEnabled, setGestureEnabled] = useState(true) // Add state to keep track of animation start

  const pressStartRef = useRef(0)

  const panRef = useRef(null)
  const pinchRef = useRef(null)

  const createClipPath = (
    id: string,
    cx: number,
    cy: number,
    radius: number
  ) => (
    <ClipPath id={id}>
      <Circle cx={cx} cy={cy} r={radius} />
    </ClipPath>
  )

  // Use effect to update the graph
  useEffect(() => {
    // Get the initial links, nodes and sizes

    const initialLinks = getLinks(graph)
    // Set the links, nodes and sizes
    setLinks(initialLinks)
    if (getInitialized(graph) === false) {
      setNodes(
        fruchtermanReingold(
          getNodes(graph),
          initialLinks,
          constrainedNodeId,
          WIDTH,
          HEIGHT,
          MAX_ITERATIONS
        )
      )
      setInitialized(graph, true)
    } else {
      setNodes(getNodes(graph))
    }
    setLoad(true)
  }, [graph, constrainedNodeId])

  // If the graph is not loaded, display an activity indicator
  if (!load) {
    return <ActivityIndicator size="large" color={peach} />
  }

  // Handle Dragging
  const handlePanGestureEvent = (event: {
    nativeEvent: { translationX: number; translationY: number }
  }) => {
    setTotalOffset({
      x: event.nativeEvent.translationX / lastScale,
      y: event.nativeEvent.translationY / lastScale,
    })
  }

  // Handle Dragging State Change
  const handlePanHandlerStateChange = (event: {
    nativeEvent: { state: number }
  }) => {
    if (event.nativeEvent.state === State.END) {
      setNodes(
        nodes.map((node) => ({
          ...node,
          x: coordX(node),
          y: coordY(node),
        }))
      )
      setClickedNodeID(DEFAULT_CLICKED_NODE_ID)
      setTotalOffset({ x: 0, y: 0 })
    }
  }

  // Handle Zooming
  const handlePinchGestureEvent = (event: {
    nativeEvent: { scale: React.SetStateAction<number> }
  }) => {
    setScale(Number(event.nativeEvent.scale) * Number(lastScale))
  }

  const handlePinchHandlerStateChange = (event: {
    nativeEvent: { state: number }
  }) => {
    if (event.nativeEvent.state === State.END) {
      setLastScale(scale)
    }
  }

  // Handle PRESS IN
  const handlePressIn = (onPressCallback = () => {}) => {
    onPressCallback()
  }

  // Handle PRESS OUT
  const handlePressOut = (shortPressCallback = () => {}) => {
    if (
      Date.now() - pressStartRef.current < SHORT_PRESS_DURATION &&
      Date.now() - pressStartRef.current > VERY_SHORT_PRESS_DURATION
    ) {
      shortPressCallback()
    }
  }

  const nodeZoomIn = (clickedNode: Node) => {
    setGestureEnabled(false) // Set animation started to true

    let currentFrame = 0

    const initialScale = lastScale // Initial scale before zooming

    const scaleIncrement = (TARGET_SCALE - initialScale) / TOTAL_FRAMES // Incremental change in scale per frame

    const initialOffsetX = totalOffset.x // Initial offset X before zooming
    const initialOffsetY = totalOffset.y // Initial offset Y before zooming

    const targetOffsetX = initialOffsetX - (coordX(clickedNode) - CENTER_WIDTH) // Target offset X after zooming
    const targetOffsetY = initialOffsetY - (coordY(clickedNode) - CENTER_HEIGHT) // Target offset Y after zooming

    const animateZoom = () => {
      if (currentFrame <= TOTAL_FRAMES) {
        const newScale = initialScale + scaleIncrement * currentFrame

        const newOffsetX =
          initialOffsetX +
          ((targetOffsetX - initialOffsetX) * currentFrame) / TOTAL_FRAMES
        const newOffsetY =
          initialOffsetY +
          ((targetOffsetY - initialOffsetY) * currentFrame) / TOTAL_FRAMES

        setScale(newScale)
        setTotalOffset({ x: newOffsetX, y: newOffsetY })

        currentFrame++

        requestAnimationFrame(animateZoom)
      } else {
        setGestureEnabled(true)
        setLastScale(TARGET_SCALE) // Set last scale to the target scale
        setScale(TARGET_SCALE) // Set scale to the target scale
        setTotalOffset({ x: 0, y: 0 }) // Reset the total offset
        setNodes(
          nodes.map((node) => ({
            ...node,
            x: coordX(node) - (coordX(clickedNode) - CENTER_WIDTH),
            y: coordY(node) - (coordY(clickedNode) - CENTER_HEIGHT),
          }))
        )
      }
    }

    requestAnimationFrame(animateZoom)
  }

  // Functions to get the X and Y coordinates of the nodes and the fill color of the nodes
  const coordX = (node: Node): number => {
    if (
      !gestureEnabled ||
      (gestureEnabled &&
        (clickedNodeID == DEFAULT_CLICKED_NODE_ID || clickedNodeID === node.id))
    ) {
      return node.x + totalOffset.x
    }
    return node.x
  }

  const coordY = (node: Node): number => {
    if (
      !gestureEnabled ||
      (gestureEnabled &&
        (clickedNodeID == DEFAULT_CLICKED_NODE_ID || clickedNodeID === node.id))
    ) {
      return node.y + totalOffset.y
    }
    return node.y
  }

  // Create the lines and circles for the graph
  const LINES = links.map((link) => (
    <Line
      key={link.source + link.target + "line"}
      x1={coordX(nodes.find((node) => node.id === link.source) as Node)}
      y1={coordY(nodes.find((node) => node.id === link.source) as Node)}
      x2={coordX(nodes.find((node) => node.id === link.target) as Node)}
      y2={coordY(nodes.find((node) => node.id === link.target) as Node)}
      stroke={DEFAULT_LINK_COLOR}
    />
  ))

  const CIRCLES = nodes.map((node) => (
    <G key={node.id + "group"}>
      {createClipPath(
        `clipPath-${node.id}`,
        coordX(node),
        coordY(node),
        DEFAULT_NODE_SIZE / node.level
      )}

      <Circle
        key={node.id + "circle"}
        cx={coordX(node)}
        cy={coordY(node)}
        r={(DEFAULT_NODE_SIZE / node.level) * NODE_HIGHLIGHT_RATIO}
        fill={getNodeById(graph, node.id)?.selected ? peach : transparent}
        onPressIn={() => {
          handlePressIn(() => {
            pressStartRef.current = Date.now()
            setClickedNodeID(node.id)
          })
        }}
        onPressOut={() => {
          handlePressOut(() => {
            onModalPress(node.id)
            setClickedNodeID(DEFAULT_CLICKED_NODE_ID)
            nodeZoomIn(node)
          })
        }}
        testID={"node-" + node.id}
      />
      <TouchableWithoutFeedback
        onPressIn={() => {
          handlePressIn(() => {
            pressStartRef.current = Date.now()
            setClickedNodeID(node.id)
          })
        }}
        onPressOut={() => {
          handlePressOut(() => {
            onModalPress(node.id)
            setClickedNodeID(DEFAULT_CLICKED_NODE_ID)
            nodeZoomIn(node)
          })
        }}
      >
        <Image
          key={node.id + "image"}
          x={coordX(node) - DEFAULT_NODE_SIZE / node.level}
          y={coordY(node) - DEFAULT_NODE_SIZE / node.level}
          width={(2 * DEFAULT_NODE_SIZE) / node.level}
          height={(2 * DEFAULT_NODE_SIZE) / node.level}
          xlinkHref={node.contact.profilePictureUrl}
          clipPath={`url(#clipPath-${node.id})`}
          preserveAspectRatio="xMidYMid slice"
        />
      </TouchableWithoutFeedback>

      {node.id !== constrainedNodeId && (
        <SVGText
          key={node.id + "text"}
          x={coordX(node)}
          y={
            coordY(node) +
            DEFAULT_NODE_SIZE / node.level +
            NODE_TEXT_OFFSET / scale
          }
          fontSize={styles.profileName.fontSize / node.level / scale}
          fontFamily={globalStyles.text.fontFamily}
          textAnchor="middle"
          testID={"text-" + node.id}
        >
          {node.contact.firstName + " " + node.contact.lastName}
        </SVGText>
      )}
    </G>
  ))

  return (
    <View style={styles.container}>
      <GestureHandlerRootView style={styles.container}>
        <PinchGestureHandler
          ref={pinchRef}
          onGestureEvent={handlePinchGestureEvent}
          onHandlerStateChange={handlePinchHandlerStateChange}
          simultaneousHandlers={panRef}
          enabled={gestureEnabled}
          testID="pinch-handler"
        >
          <PanGestureHandler
            ref={panRef}
            onGestureEvent={handlePanGestureEvent}
            onHandlerStateChange={handlePanHandlerStateChange}
            minPointers={PAN_GESTURE_MIN_MAX_POINTERS}
            maxPointers={PAN_GESTURE_MIN_MAX_POINTERS}
            simultaneousHandlers={pinchRef}
            enabled={gestureEnabled}
            testID="pan-handler"
          >
            <View style={styles.container}>
              <Svg width={WIDTH} height={HEIGHT}>
                <G
                  scale={scale}
                  originX={CENTER_WIDTH}
                  originY={CENTER_HEIGHT}
                  testID="group"
                >
                  {LINES}
                  {CIRCLES}
                </G>
              </Svg>
            </View>
          </PanGestureHandler>
        </PinchGestureHandler>
      </GestureHandlerRootView>
    </View>
  )
}

export default ForceDirectedGraph
