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

// Constants used for the gestures
const VERY_SHORT_PRESS_DURATION = 50 // When the press is shorter than 50ms, we don't consider it as an actual click
const SHORT_PRESS_DURATION = 100 // When the press is more longer than 100ms, we consider that it is intended for dragging a node
const PAN_GESTURE_MIN_MAX_POINTERS = 1 // Minimum and maximum number of pointers for the pan gesture (i.e., one finger)
const DEFAULT_CLICKED_NODE_ID = ""

// Constants used for UI
const NODE_HIGHLIGHT_RATIO = 1.3
const NODE_TEXT_OFFSET = 20
const DEFAULT_NODE_SIZE = 40
const DEFAULT_LINK_COLOR = black

// Constants used for the Fruchterman-Reingold algorithm
const MAX_ITERATIONS = 1000 // Maximum number of iterations for the used algorithn

// Constants used for rendering and positioning
const WIDTH = Dimensions.get("window").width // Width of the screen
const HEIGHT = Dimensions.get("window").height // Height of the screen
const CENTER_WIDTH = WIDTH / 2 // Center X-coordinates of the screen
const CENTER_HEIGHT = HEIGHT / 2 // Center Y-coordinates of the screen
const INITIAL_SCALE = 1 // Initial scale of the graph

// Constants used for the animation
const TARGET_SCALE = 2 // Target scale for zooming in
const ANIMATION_DURATION = 500 // Duration of the animation in milliseconds
const FPS = 60 // Number of frames per second for smooth animation
const TOTAL_FRAMES = FPS * (ANIMATION_DURATION / 1000) // Total number of frames

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
  // States to store the nodes, links and loading status
  const [nodes, setNodes] = useState<Node[]>([])
  const [links, setLinks] = useState<Link[]>([])
  const [load, setLoad] = useState<boolean>(false)

  // State to store the total offset when dragging the graph
  const [totalOffset, setTotalOffset] = useState({ x: 0, y: 0 })

  const [clickedNodeID, setClickedNodeID] = useState<string>(
    DEFAULT_CLICKED_NODE_ID
  )

  const [scale, setScale] = useState(INITIAL_SCALE)
  const [lastScale, setLastScale] = useState(INITIAL_SCALE) // Add state to keep track of last scale

  // State to store the gesture enabled status (i.e., whether the user can interact with the graph or not)
  const [gestureEnabled, setGestureEnabled] = useState(true)

  // Refs to store the press start time
  const pressStartRef = useRef(0)

  // Refs to store the pan and pinch gesture handlers
  const panRef = useRef(null)
  const pinchRef = useRef(null)

  // Function to create a clip path for the nodes (i.e., to create a circular mask for the profile pictures of the nodes)
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

  // Use effect to get the initial links, nodes and sizes
  useEffect(() => {
    const initialLinks = getLinks(graph)
    setLinks(initialLinks)

    // If the graph is not initialized, run the Fruchterman-Reingold algorithm
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
      // Set the graph as initialized to avoid running the algorithm again
      setInitialized(graph, true)
    } else {
      // If the graph is already initialized, we don't need to run the algorithm again as the nodes are already positioned
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

  // Handle Dragging State Change (i.e. when we are done dragging the graph or a node)
  const handlePanHandlerStateChange = (event: {
    nativeEvent: { state: number }
  }) => {
    // If the gesture is over, update the nodes with the new positions and reset the total offset and clicked node ID
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

  // Handle Zooming State Change (i.e. when we are done zooming)
  const handlePinchHandlerStateChange = (event: {
    nativeEvent: { state: number }
  }) => {
    // If the gesture is over, update the last scale
    if (event.nativeEvent.state === State.END) {
      setLastScale(scale)
    }
  }

  const handlePressIn = (onPressCallback = () => {}) => {
    onPressCallback()
  }

  const handlePressOut = (shortPressCallback = () => {}) => {
    // If the press is shorter than 50ms, we don't consider it as an actual click
    // If the press is more longer than 100ms, we consider that it is intended for dragging a node
    if (
      Date.now() - pressStartRef.current < SHORT_PRESS_DURATION &&
      Date.now() - pressStartRef.current > VERY_SHORT_PRESS_DURATION
    ) {
      shortPressCallback()
    }
  }

  // Function to zoom in on a node when it is clicked
  const nodeZoomIn = (clickedNode: Node) => {
    setGestureEnabled(false) // Disable gestures while animating

    const initialScale = lastScale
    const scaleIncrement = (TARGET_SCALE - initialScale) / TOTAL_FRAMES

    const initialOffsetX = totalOffset.x
    const initialOffsetY = totalOffset.y

    const targetOffsetX = initialOffsetX - (coordX(clickedNode) - CENTER_WIDTH)
    const targetOffsetY = initialOffsetY - (coordY(clickedNode) - CENTER_HEIGHT)

    let currentFrame = 0

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
        // When the animation is over do the following:
        setGestureEnabled(true) // Re-enable gestures

        // Fix the last and current scales value
        setLastScale(TARGET_SCALE)
        setScale(TARGET_SCALE)

        setTotalOffset({ x: 0, y: 0 }) // Reset the total offset

        // Fix the positions of the nodes
        setNodes(
          nodes.map((node) => ({
            ...node,
            x: coordX(node) - (coordX(clickedNode) - CENTER_WIDTH),
            y: coordY(node) - (coordY(clickedNode) - CENTER_HEIGHT),
          }))
        )
      }
    }

    // Start the animation
    requestAnimationFrame(animateZoom)
  }

  const coordX = (node: Node): number => {
    // If gesture is not enabled the animation is running and therefore the whole graph is moving
    if (!gestureEnabled) {
      return node.x + totalOffset.x
    }

    // When the animation is not running, we are either dragging a node or dragging the whole graph.

    // If clickedNodeID is equal to the default value, it means that no node is clicked, therefore the whole graph is dragged
    if (clickedNodeID == DEFAULT_CLICKED_NODE_ID) {
      return node.x + totalOffset.x
    }

    // If clickedNodeID is equal to a specific node's ID, it means that the said node is clicked and being dragged
    if (clickedNodeID === node.id) {
      return node.x + totalOffset.x
    }

    // Otherwise no movement is occuring and the node is at its original position
    return node.x
  }

  const coordY = (node: Node): number => {
    // If gesture is not enabled the animation is running and therefore the whole graph is moving
    if (!gestureEnabled) {
      return node.y + totalOffset.y
    }

    // When the animation is not running, we are either dragging a node or dragging the whole graph.

    // If clickedNodeID is equal to the default value, it means that no node is clicked, therefore the whole graph is dragged
    if (clickedNodeID == DEFAULT_CLICKED_NODE_ID) {
      return node.y + totalOffset.y
    }

    // If clickedNodeID is equal to a specific node's ID, it means that the said node is clicked and being dragged
    if (clickedNodeID === node.id) {
      return node.y + totalOffset.y
    }

    // Otherwise no movement is occuring and the node is at its original position
    return node.y
  }

  // Render the LINKS and NODES
  const LINKS = links.map((link) => (
    <Line
      key={link.source + link.target + "line"}
      x1={coordX(nodes.find((node) => node.id === link.source) as Node)}
      y1={coordY(nodes.find((node) => node.id === link.source) as Node)}
      x2={coordX(nodes.find((node) => node.id === link.target) as Node)}
      y2={coordY(nodes.find((node) => node.id === link.target) as Node)}
      stroke={DEFAULT_LINK_COLOR}
    />
  ))

  const NODES = nodes.map((node) => (
    // Group the elements together for each node
    <G key={node.id + "group"}>
      {/* Apply the mask to the profile picture of the node */}
      <G key={`${node.id}-group-${coordX(node)}-${coordY(node)}`}>
        {createClipPath(
          `clipPath-${node.id}`,
          coordX(node),
          coordY(node),
          DEFAULT_NODE_SIZE / node.level
        )}
      </G>
      {/* Circle to highlight the node when it is selected */}
      <Circle
        key={node.id + "circle"}
        cx={coordX(node)}
        cy={coordY(node)}
        r={(DEFAULT_NODE_SIZE / node.level) * NODE_HIGHLIGHT_RATIO}
        fill={getNodeById(graph, node.id)?.selected ? peach : transparent}
      />

      {/* Allow the node to be clicked and / or dragged */}
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
        {/* Profile picture of the node */}
        <Image
          key={node.id + "image"}
          x={coordX(node) - DEFAULT_NODE_SIZE / node.level}
          y={coordY(node) - DEFAULT_NODE_SIZE / node.level}
          width={(2 * DEFAULT_NODE_SIZE) / node.level}
          height={(2 * DEFAULT_NODE_SIZE) / node.level}
          xlinkHref={node.contact.profilePictureUrl}
          clipPath={`url(#clipPath-${node.id})`}
          preserveAspectRatio="xMidYMid slice"
          testID={"node-" + node.id}
        />
      </TouchableWithoutFeedback>

      {/* Text to display the name of the node if it is not your own */}
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
                {LINKS}
                {NODES}
              </G>
            </Svg>
          </View>
        </PanGestureHandler>
      </PinchGestureHandler>
    </GestureHandlerRootView>
  )
}

export default ForceDirectedGraph
