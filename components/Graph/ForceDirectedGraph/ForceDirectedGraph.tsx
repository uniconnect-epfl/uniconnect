import React, { useEffect, useRef, useState } from "react"

import {
  ActivityIndicator,
  Dimensions,
  TouchableWithoutFeedback,
  Vibration,
  Animated,
} from "react-native"
import Svg, {
  Circle,
  G,
  Line,
  ClipPath,
  Text as SVGText,
  Image,
  Defs,
  RadialGradient,
  Stop,
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
import { showErrorToast } from "../../ToastMessage/toast"

// Constants used for the gestures
const DOUBLE_PRESS_DURATION = 300 // When the press is more longer than 100ms, we consider that it is intended for dragging a node
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
const INITIAL_SCALE = 20 // Initial scale of the graph
const DEFAULT_SCALE = 1 // Default scale of the graph
const MODAL_SCALE = 8 // Scale of the graph when a node is clicked

// Constants used for the animation
const ANIMATION_DURATION = 500 // Duration of the animation in milliseconds

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
  magicNodeId: string
  modalPressedOut: boolean
  onModalPress: (uid: string) => void
  onMagicPress: (uid: string) => void
  reload?: () => void
}> = ({
  graph,
  constrainedNodeId,
  magicNodeId,
  modalPressedOut,
  onModalPress,
  onMagicPress,
  reload,
}) => {
  const [transitionScale] = useState(new Animated.Value(20))
  const [transitionTranslateX] = useState(new Animated.Value(0))
  const [transitionTranslateY] = useState(new Animated.Value(0))

  const [animationStarted, setAnimationStarted] = useState(false)

  const zoomAndTranslate = (
    animationScale: number,
    animationX: number,
    animationY: number
  ) => {
    setAnimationStarted(true)
    Animated.parallel([
      Animated.timing(transitionTranslateX, {
        toValue: animationX,
        duration: ANIMATION_DURATION,
        useNativeDriver: true,
      }),
      Animated.timing(transitionTranslateY, {
        toValue: animationY,
        duration: ANIMATION_DURATION,
        useNativeDriver: true,
      }),
      Animated.timing(transitionScale, {
        toValue: animationScale,
        duration: ANIMATION_DURATION,
        useNativeDriver: true,
      }),
    ]).start()
  }

  // States to store the nodes, links and loading status
  const [nodes, setNodes] = useState<Node[]>([])
  const [links, setLinks] = useState<Link[]>([])
  const [load, setLoad] = useState<boolean>(false)

  // State to store the total offset when dragging the graph
  const [totalOffset, setTotalOffset] = useState({ x: 0, y: 0 })

  const [clickedNodeID, setClickedNodeID] = useState<string>(
    DEFAULT_CLICKED_NODE_ID
  )

  const [scale, setScale] = useState(DEFAULT_SCALE)
  const [lastScale, setLastScale] = useState(DEFAULT_SCALE) // Add state to keep track of last scale

  // Refs to store the press start time
  const pressStartRef = useRef(0)
  const lastPressRef = useRef(0)

  // Refs to store the pan and pinch gesture handlers
  const panRef = useRef(null)
  const pinchRef = useRef(null)

  // Function to create a clip path for the nodes (i.e., to create a circular mask for the profile pictures of the nodes)
  const profilePictureMask = (
    id: string,
    cx: number,
    cy: number,
    radius: number
  ) => (
    <ClipPath id={id}>
      <Circle cx={cx} cy={cy} r={radius} />
    </ClipPath>
  )

  const animationMask = (
    id: string,
    cx: number,
    cy: number,
    radius: number
  ) => (
    <Defs>
      <RadialGradient
        id={id}
        cx={cx}
        cy={cy}
        rx={radius}
        ry={radius}
        fx={cx}
        fy={cy}
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset="0" stopColor="#000" stopOpacity="0.5" />
        <Stop offset="1" stopColor="#fff" stopOpacity="0.75" />
      </RadialGradient>
    </Defs>
  )

  useEffect(() => {
    if (modalPressedOut) {
      setTimeout(() => {
        zoomAndTranslate(DEFAULT_SCALE, 0, 0)
        setAnimationStarted(false)
        setTotalOffset({ x: 0, y: 0 })
      }, 100)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalPressedOut])

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
          magicNodeId == "" ? constrainedNodeId : magicNodeId,
          WIDTH,
          HEIGHT,
          MAX_ITERATIONS
        )
      )
      // Set the graph as initialized to avoid running the algorithm again
      setInitialized(graph, true)
      if (reload) {
        reload()
      }
    } else {
      // If the graph is already initialized, we don't need to run the algorithm again as the nodes are already positioned
      setNodes(getNodes(graph))
    }
    setLoad(true)
    transitionTranslateX.setValue(0)
    transitionTranslateY.setValue(0)
    setTotalOffset({ x: 0, y: 0 })
    zoomAndTranslate(DEFAULT_SCALE, 0, 0)
    setTimeout(() => {
      setAnimationStarted(false)
    }, ANIMATION_DURATION)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [graph, constrainedNodeId, magicNodeId])

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
    nativeEvent: {
      scale: React.SetStateAction<number>
    }
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

  const handlePressIn = (
    onPressCallback = () => {},
    onDoublePressCallback = () => {}
  ) => {
    pressStartRef.current = Date.now()
    const delta = pressStartRef.current - lastPressRef.current
    if (delta < DOUBLE_PRESS_DURATION) {
      onDoublePressCallback()
    } else {
      onPressCallback()
    }
    lastPressRef.current = Date.now()
  }

  const coordX = (node: Node): number => {
    if (node === undefined) {
      return 0
    }

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
    if (node === undefined) {
      return 0
    }

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
        {profilePictureMask(
          `clipPath-${node.id}`,
          coordX(node),
          coordY(node),
          DEFAULT_NODE_SIZE / node.level
        )}
        {animationMask(
          `mask-${node.id}`,
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
        onLayout={(event) => {
          const layout = event.nativeEvent.layout
          if (
            layout.x < 0 ||
            layout.y < 0 ||
            layout.x + layout.width > WIDTH ||
            layout.y + layout.height > HEIGHT
          ) {
            node.outsideScreen = true
          } else {
            node.outsideScreen = false
          }
        }}
        onPress={() => {
          setClickedNodeID(DEFAULT_CLICKED_NODE_ID)
        }}
        onPressIn={() => {
          handlePressIn(
            () => {
              setClickedNodeID(node.id)
            },
            () => {
              if (node.outsideScreen) {
                showErrorToast("You cannot select a node outside the screen.")
                setClickedNodeID(DEFAULT_CLICKED_NODE_ID)
              } else {
                onModalPress(node.id)

                // Adjust the zoom and translate to account for the scale
                zoomAndTranslate(
                  MODAL_SCALE / scale,
                  (CENTER_WIDTH - coordX(node)) * scale,
                  (CENTER_HEIGHT - coordY(node)) * scale
                )
                setAnimationStarted(false)
              }
            }
          )
        }}
        onLongPress={() => {
          Vibration.vibrate()
          if (node.outsideScreen) {
            showErrorToast("You cannot select a node outside the screen.")
            setClickedNodeID(DEFAULT_CLICKED_NODE_ID)
          } else if (node.level > 2) {
            showErrorToast("You can only view friends of friends")
            setClickedNodeID(DEFAULT_CLICKED_NODE_ID)
          } else {
            if (magicNodeId === "" && node.id === constrainedNodeId) {
              showErrorToast(
                "You cannot unselect without selecting a node first"
              )
              setClickedNodeID(DEFAULT_CLICKED_NODE_ID)
            } else if (getNodeById(graph, node.id).magicSelected) {
              zoomAndTranslate(
                INITIAL_SCALE,
                (CENTER_WIDTH - coordX(getNodeById(graph, constrainedNodeId))) *
                  scale,
                (CENTER_HEIGHT -
                  coordY(getNodeById(graph, constrainedNodeId))) *
                  scale
              )
            } else {
              zoomAndTranslate(
                INITIAL_SCALE,
                (CENTER_WIDTH - coordX(node)) * scale,
                (CENTER_HEIGHT - coordY(node)) * scale
              )
            }
            setTimeout(() => {
              onMagicPress(node.id)
              setClickedNodeID(DEFAULT_CLICKED_NODE_ID)
            }, ANIMATION_DURATION)
          }
        }}
        hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }}
      >
        <G>
          {/* Profile picture of the node */}
          {node.contact.profilePictureUrl === "" ? (
            <Image
              key={node.id + "image"}
              x={coordX(node) - DEFAULT_NODE_SIZE / node.level}
              y={coordY(node) - DEFAULT_NODE_SIZE / node.level}
              width={(2 * DEFAULT_NODE_SIZE) / node.level}
              height={(2 * DEFAULT_NODE_SIZE) / node.level}
              href={require("../../../assets/default_profile_picture.png")}
              clipPath={`url(#clipPath-${node.id})`}
              preserveAspectRatio="xMidYMid slice"
              testID={"node-" + node.id}
            />
          ) : (
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
          )}

          <Circle
            key={node.id + "mask"}
            cx={coordX(node)}
            cy={coordY(node)}
            r={DEFAULT_NODE_SIZE / node.level}
            fill={animationStarted ? `url(#mask-${node.id})` : transparent}
          />
        </G>
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
        testID="pinch-handler"
      >
        <PanGestureHandler
          ref={panRef}
          onGestureEvent={handlePanGestureEvent}
          onHandlerStateChange={handlePanHandlerStateChange}
          minPointers={PAN_GESTURE_MIN_MAX_POINTERS}
          maxPointers={PAN_GESTURE_MIN_MAX_POINTERS}
          simultaneousHandlers={pinchRef}
          testID="pan-handler"
        >
          <Animated.View
            style={{
              transform: [
                { scale: transitionScale },
                { translateX: transitionTranslateX },
                { translateY: transitionTranslateY },
              ],
            }}
          >
            <Svg width={WIDTH} height={HEIGHT}>
              <G scale={scale} originX={CENTER_WIDTH} originY={CENTER_HEIGHT}>
                {LINKS}
                {NODES}
              </G>
            </Svg>
          </Animated.View>
        </PanGestureHandler>
      </PinchGestureHandler>
    </GestureHandlerRootView>
  )
}

export default ForceDirectedGraph
