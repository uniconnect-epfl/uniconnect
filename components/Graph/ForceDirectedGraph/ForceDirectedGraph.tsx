import React, { useEffect, useRef, useState } from "react"
import {
  ActivityIndicator,
  View,
  Dimensions,
  Modal,
  Text,
  TouchableWithoutFeedback,
} from "react-native"
import Svg, { Circle, G, Line, Text as SVGText, Image } from "react-native-svg"

import styles from "./styles"
import Graph, { Link, Node } from "../Graph"
import { fruchtermanReingold } from "../graphAlgorithms/FruchtermanReingold"

import {
  PanGestureHandler,
  PinchGestureHandler,
  State,
  GestureHandlerRootView,
} from "react-native-gesture-handler"

import { peach } from "../../../assets/colors/colors"

import profile_picture_0 from "../../../assets/graph-template-profile-pictures/graph-template-profile-picture-0.png"
import profile_picture_1 from "../../../assets/graph-template-profile-pictures/graph-template-profile-picture-1.png"
import profile_picture_2 from "../../../assets/graph-template-profile-pictures/graph-template-profile-picture-2.png"
import profile_picture_3 from "../../../assets/graph-template-profile-pictures/graph-template-profile-picture-3.png"
import profile_picture_4 from "../../../assets/graph-template-profile-pictures/graph-template-profile-picture-4.png"
import profile_picture_5 from "../../../assets/graph-template-profile-pictures/graph-template-profile-picture-5.png"
import profile_picture_6 from "../../../assets/graph-template-profile-pictures/graph-template-profile-picture-6.png"

const PROFILE_PICTURES = [
  profile_picture_0,
  profile_picture_1,
  profile_picture_2,
  profile_picture_3,
  profile_picture_4,
  profile_picture_5,
  profile_picture_6,
]

const VERY_SHORT_PRESS_DURATION = 50
const SHORT_PRESS_DURATION = 100
const NODE_HITBOX_SIZE = 20 // Hitbox size of the nodes
const DEFAULT_NODE_SIZE = 10 // Default size of the nodes
const DEFAULT_NODE_SIZE_INCREMENT = 2 // Increment in the size of the nodes

const DEFAULT_LINK_COLOR = "black" // Default color of the links
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
  onContactPress: (uid: string) => void
}> = ({ graph, constrainedNodeId, onContactPress}) => {

  // States to store the nodes, links, sizes and loading status
  const [nodes, setNodes] = useState<Node[]>([])
  const [links, setLinks] = useState<Link[]>([])
  const [sizes, setSizes] = useState<Map<string, number>>(new Map())
  const [load, setLoad] = useState<boolean>(false)

  // State to store the total offset when dragging the graph
  const [totalOffset, setTotalOffset] = useState({ x: 0, y: 0 })
  const [clickedNodeID, setClickedNodeID] = useState<string>(
    DEFAULT_CLICKED_NODE_ID,
  ) // Node ID of clicked node
  const [scale, setScale] = useState(INITIAL_SCALE)
  const [lastScale, setLastScale] = useState(INITIAL_SCALE) // Add state to keep track of last scale

  const [gestureEnabled, setGestureEnabled] = useState(true) // Add state to keep track of animation start

  const [modalVisible, setModalVisible] = useState(false)

  const pressStartRef = useRef(0)

  const panRef = useRef(null)
  const pinchRef = useRef(null)

  // Use effect to update the graph
  useEffect(() => {
    // Get the initial links, nodes and sizes
    
    const initialLinks = graph.getLinks()
    const initialNodes = graph.getNodes()
    const initialSizes = setNodesSizes(initialLinks)
    // Set the links, nodes and sizes
    setLinks(initialLinks)
    if (graph.getInitialized() === false) {
      setNodes(
        fruchtermanReingold(
          initialNodes,
          initialLinks,
          constrainedNodeId,
          WIDTH,
          HEIGHT,
          MAX_ITERATIONS,
        ),
      )
      graph.setInitialized(true)
    }
    else {
      setNodes(initialNodes)
    }
    setSizes(initialSizes)
    setLoad(true)

  }, [graph, constrainedNodeId])

  // If the graph is not loaded, display an activity indicator
  if (!load) {
    return <ActivityIndicator size="large" color="#0000ff" />
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
        })),
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
      Date.now() - pressStartRef.current > VERY_SHORT_PRESS_DURATION){
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
      }
      else {
        setGestureEnabled(true)
        setLastScale(TARGET_SCALE) // Set last scale to the target scale
        setScale(TARGET_SCALE) // Set scale to the target scale
        setTotalOffset({ x: 0, y: 0 }) // Reset the total offset
        setNodes(
          nodes.map((node) => ({
            ...node,
            x: coordX(node) - (coordX(clickedNode) - CENTER_WIDTH),
            y: coordY(node) - (coordY(clickedNode) - CENTER_HEIGHT),
          })),
        )
      }
    }

    animateZoom()
    
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
      x1={coordX(
        nodes.find((node) => node.id === link.source) ?? {
          x: CENTER_WIDTH,
          y: CENTER_HEIGHT,
          id: link.source,
          dx: 0,
          dy: 0,
        },
      )}
      y1={coordY(
        nodes.find((node) => node.id === link.source) ?? {
          x: CENTER_WIDTH,
          y: CENTER_HEIGHT,
          id: link.source,
          dx: 0,
          dy: 0,
        },
      )}
      x2={coordX(
        nodes.find((node) => node.id === link.target) ?? {
          x: CENTER_WIDTH,
          y: CENTER_HEIGHT,
          id: link.target,
          dx: 0,
          dy: 0,
        },
      )}
      y2={coordY(
        nodes.find((node) => node.id === link.target) ?? {
          x: CENTER_WIDTH,
          y: CENTER_HEIGHT,
          id: link.target,
          dx: 0,
          dy: 0,
        },
      )}
      stroke={DEFAULT_LINK_COLOR}
    />
  ))

  const CIRCLES = nodes.map((node) => (
    <G key={node.id + "group"}>
      <Circle
        key={node.id + "highlight"}
        cx={coordX(node)}
        cy={coordY(node)}
        r={(sizes.get(node.id) ?? DEFAULT_NODE_SIZE) * (node.selected ? 1.3 : 1)}
        fill={peach} 
      />
      <Image
        key={node.id + "image"}
        x={coordX(node) - (sizes.get(node.id) ?? DEFAULT_NODE_SIZE)}
        y={coordY(node) - (sizes.get(node.id) ?? DEFAULT_NODE_SIZE)}
        width={2 * (sizes.get(node.id) ?? DEFAULT_NODE_SIZE)}
        height={2 * (sizes.get(node.id) ?? DEFAULT_NODE_SIZE)}
        href={PROFILE_PICTURES[parseInt(node.id) % PROFILE_PICTURES.length]}
      />
      <Circle
        key={node.id + "circle"}
        cx={coordX(node)}
        cy={coordY(node)}
        r={
          (sizes.get(node.id) ?? DEFAULT_NODE_SIZE) +
          (NODE_HITBOX_SIZE) / lastScale
        }
        fill={"transparent"}
        onPressIn={() => {
          handlePressIn(() => {
            pressStartRef.current = Date.now()
            setClickedNodeID(node.id)
          })
        }
        }
        onPressOut={() =>{
          handlePressOut(() => {
            setModalVisible(true)
            nodeZoomIn(node)
          })
        }
        }
        testID={"node-" + node.id}
      />
      <SVGText
        key={node.id + "text"}
        x={coordX(node)} // Align horizontally with the center of the circle
        y={
          coordY(node) +
          (sizes.get(node.id) ?? DEFAULT_NODE_SIZE) +
          1.5 * DEFAULT_NODE_SIZE
        } // Position below the circle adjust 10 as needed
        textAnchor="middle" // Center the text under the circle
      >
        {node.id}
      </SVGText>
    </G>
  ))

  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        testID="modal"
      >
        <TouchableWithoutFeedback
          onPress={() => {
            setModalVisible(false)
            setClickedNodeID(DEFAULT_CLICKED_NODE_ID)
            setGestureEnabled(true)
          }}
          testID="modal-touchable"
        >
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback>
              <View style={styles.modalView}>
                <Svg style={styles.modalProfilePicture}>
                  <Image
                    key={clickedNodeID + "modalimage"}
                    width={80}
                    height={80}
                    href={
                      PROFILE_PICTURES[
                        parseInt(clickedNodeID) % PROFILE_PICTURES.length
                      ]
                    }
                    onPress={() => {
                      setModalVisible(false)
                      setGestureEnabled(true)
                      onContactPress(clickedNodeID)
                      setClickedNodeID(DEFAULT_CLICKED_NODE_ID)
                    }}
                    testID="modal-profile-picture"
                  />
                </Svg>
                <Text style={styles.modalProfileName}>
                  Node ID: {clickedNodeID}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

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
            minPointers={1}
            maxPointers={1}
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

/**
 *
 * @description Sets the sizes of the nodes
 * @param links - Links in the graph
 * @returns - Map of node identifiers to their sizes
 */
function setNodesSizes(links: Link[]): Map<string, number> {
  // Initialize the sizes
  const sizes = new Map<string, number>()

  // Increment the size of the nodes based on the links
  for (const link of links) {
    [link.source, link.target].forEach((id) => {
      sizes.set(
        id,
        (sizes.get(id) ?? DEFAULT_NODE_SIZE) + DEFAULT_NODE_SIZE_INCREMENT,
      )
    })
  }

  return sizes
}
