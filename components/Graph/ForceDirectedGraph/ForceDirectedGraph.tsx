import React from "react"
import { useState, useEffect, useRef, useCallback, useMemo } from "react"
import {
  Dimensions,
  GestureResponderEvent,
  Image,
  PanResponder,
  PanResponderGestureState,
  PanResponderInstance,
  Vibration,
  View,
} from "react-native"

import Svg, { Circle, G, Line, Text as SVGText } from "react-native-svg"
import * as d3 from "d3-force"
import Graph, { Node, Link } from "../Graph" // Import your Graph class and types here
import { peach, transparent } from "../../../assets/colors/colors"
import { globalStyles } from "../../../assets/global/globalStyles"
import styles from "./styles"
import { showErrorToast } from "../../ToastMessage/toast"

const DEFAULT_NODE_SIZE = 80
const NODE_TEXT_VERTICAL_OFFSET = 10

const DOUBLE_PRESS_DELAY = 300
const STATIC_PRESS_MAX_OFFSET = 5

const DEFAULT_SIMULATION_DISTANCE = 100
const DEFAULT_SIMULATION_CHARGE = -200
const DEFAULT_SIMULATION_COLLIDE = 20
interface SimulationParameters {
  distance?: number
  charge?: number
  center?: [number, number]
  collide?: number
}

interface ForceDirectedGraphProps {
  graph: Graph
  constrainedNodeId: string
  magicNodeId: string
  onModalPress: (uid: string) => void
  onMagicPress: (uid: string) => void
  rotation?: boolean
  simulationParameters?: SimulationParameters
}

const ForceDirectedGraph: React.FC<ForceDirectedGraphProps> = ({
  graph,
  constrainedNodeId,
  magicNodeId,
  onModalPress,
  onMagicPress,
  rotation,
  simulationParameters,
}) => {
  // Logic behing the graph's display when the screen is rotated
  const [width, setWidth] = useState(Dimensions.get("window").width)
  const [height, setHeight] = useState(Dimensions.get("window").height)

  useEffect(() => {
    setWidth(Dimensions.get("window").width)
    setHeight(Dimensions.get("window").height)
  }, [rotation])

  // Graph state and simulation
  const simulationRef = useRef<d3.Simulation<Node, Link>>()

  const [graphState, setGraphState] = useState<{
    nodes: Node[]
    links: Link[]
  }>({
    nodes: [],
    links: [],
  })

  // Simulation logic
  useEffect(() => {
    const nodes = graph.nodes
    const links = graph.links
    if (graphState.nodes.length === 0 || graphState.links.length === 0) {
      setGraphState({ nodes: nodes, links: links })
    }

    const simulation = d3
      .forceSimulation(nodes)
      .force("link", d3.forceLink(graphState.links).id((d: d3.SimulationNodeDatum) => d.index ?? ("0" as string)).distance(simulationParameters?.distance ?? DEFAULT_SIMULATION_DISTANCE))
      .force("charge", d3.forceManyBody().strength(simulationParameters?.charge ?? DEFAULT_SIMULATION_CHARGE))
      .force("center", d3.forceCenter(...(simulationParameters?.center ?? [width / 2, height / 2])))
      .force("collide", d3.forceCollide(simulationParameters?.collide ?? DEFAULT_SIMULATION_COLLIDE))
      .on("tick", () => { setGraphState({ nodes: [...graphState.nodes], links: [...graphState.links], })})

    simulationRef.current = simulation

    return () => {
      simulation.stop()
    }
  }, [graph])

  // Update simulation parameters
  useEffect(() => {
    if (simulationRef.current) {
      simulationRef.current.nodes(graphState.nodes)
      simulationRef.current
        .force("link", d3.forceLink(graphState.links).id((d: d3.SimulationNodeDatum) => d.index ?? ("0" as string)).distance(simulationParameters?.distance ?? DEFAULT_SIMULATION_DISTANCE))
        .force("charge", d3.forceManyBody().strength(simulationParameters?.charge ?? DEFAULT_SIMULATION_CHARGE))
        .force("center", d3.forceCenter(...(simulationParameters?.center ?? [width / 2, height / 2])))
        .force("collide", d3.forceCollide(simulationParameters?.collide ?? DEFAULT_SIMULATION_COLLIDE))
        .on("tick", () => { setGraphState({ nodes: [...graphState.nodes], links: [...graphState.links], })})
        .alpha(1)
        .restart()
    }
  }, [graphState.nodes, graphState.links, simulationParameters])

  // Logic behing moving the whole graph around
  const lastPan = useRef({ x: 0, y: 0 })
  const [translation, setTranslation] = useState({ x: 0, y: 0 })

  const transformCoordinates = (x: number, y: number) => {
    if (width >= height) {
      return { x: height - y, y: x }
    }
    return { x, y }
  }

  const graphPanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.numberActiveTouches !== 1) {
          return
        }
        const { x, y } = transformCoordinates(gestureState.dx, gestureState.dy)
        setTranslation({
          x: lastPan.current.x + x,
          y: lastPan.current.y + y,
        })
      },
      onPanResponderRelease: (evt, gestureState) => {
        const { x, y } = transformCoordinates(gestureState.dx, gestureState.dy)
        lastPan.current = {
          x: lastPan.current.x + x,
          y: lastPan.current.y + y,
        }
      },
    })
  ).current

  // Logic behing interactions with nodes

  let clickedNodeID: string = ""
  let delay: number
  let timer: NodeJS.Timeout

  const panResponderRefs = useRef<Map<string, PanResponderInstance>>(new Map())

  const handleNodePanResponderGrant = (node: Node) => {
    if (Date.now() - delay < DOUBLE_PRESS_DELAY && clickedNodeID === node.id) {
      clearTimeout(timer)
      onModalPress(node.id)
    } else {
      timer = setTimeout(() => {
        Vibration.vibrate()
        if (node.level > 2) {
          showErrorToast("You can only view friends of friends")
        } else {
          if (magicNodeId === "" && node.id === constrainedNodeId) {
            showErrorToast("You cannot unselect without selecting a node first")
          } else {
            onMagicPress(node.id)
          }
        }
        clickedNodeID = ""
      }, DOUBLE_PRESS_DELAY)
    }
    delay = Date.now()
    clickedNodeID = node.id
  }

  const handleNodeDrag = useCallback(
    (node: Node, gestureState: PanResponderGestureState) => {
      const { x, y } = transformCoordinates(
        gestureState.moveX,
        gestureState.moveY
      )
      node.fx = x - translation.x
      node.fy = y - translation.y
      simulationRef.current?.alpha(1).restart()
    },
    [translation, rotation]
  )

  const handleNodePanResponderMove = (
    node: Node,
    event: GestureResponderEvent,
    gestureState: PanResponderGestureState
  ) => {
    if (
      Math.abs(gestureState.dx) > STATIC_PRESS_MAX_OFFSET ||
      Math.abs(gestureState.dy) > STATIC_PRESS_MAX_OFFSET
    ) {
      clearTimeout(timer)
    }
    handleNodeDrag(node, gestureState)
  }

  const handleNodeRelease = useCallback((node: Node) => {
    node.fx = null
    node.fy = null
    simulationRef.current?.alpha(1).restart()
  }, [])

  const handleNodePanResponderRelease = (node: Node) => {
    clearTimeout(timer)
    handleNodeRelease(node)
  }

  // Logic behind the profile pictures' display
  const [imageLoaded, setImageLoaded] = useState<Record<string, boolean>>({})

  const handleImageLoad = (nodeId: string) => {
    setImageLoaded((prev) => ({ ...prev, [nodeId]: true }))
  }

  const handleImageError = (nodeId: string) => {
    setImageLoaded((prev) => ({ ...prev, [nodeId]: false }))
  }

  const getImageSource = (url: string) => {
    return url === ""
      ? require("../../../assets/default_profile_picture.png")
      : { uri: url }
  }

  const imageSources = useMemo(
    () =>
      graphState.nodes.reduce((acc, node) => {
        acc[node.id] = getImageSource(node.contact.profilePictureUrl)
        return acc
      }, {} as Record<string, { uri: string } | number>),
    [graphState.nodes]
  )

  return (
    <View
      style={styles.container}
      {...graphPanResponder.panHandlers}
      testID="force-directed-graph-view"
    >
      <Svg height={height} width={width} testID="svg-view">
        <G>
          <Circle testID="graph-circle" />
          {graphState.links.map((link, index) => {
            const source = link.source
            const target = link.target
            return (
              <Line
                key={"lines" + index}
                x1={(source.x || 0) + translation.x}
                y1={(source.y || 0) + translation.y}
                x2={(target.x || 0) + translation.x}
                y2={(target.y || 0) + translation.y}
                stroke="grey"
                strokeWidth={1 / source.level}
              />
            )
          })}
          {graphState.nodes.map((node, index) => {
            if (!panResponderRefs.current.has(node.id)) {
              panResponderRefs.current.set(
                node.id,
                PanResponder.create({
                  onStartShouldSetPanResponder: () => true,
                  onPanResponderGrant: () => handleNodePanResponderGrant(node),
                  onPanResponderMove: (event, gestureState) =>
                    handleNodePanResponderMove(node, event, gestureState),
                  onPanResponderRelease: () =>
                    handleNodePanResponderRelease(node),
                })
              )
            }

            const imageSource = imageSources[node.id]
            return (
              <G key={"group" + index} testID={"group-" + index}>
                <Image
                  key={"profile-pictures" + index}
                  style={[
                    styles.nodeImage,
                    {
                      borderColor: node.selected ? peach : transparent,
                      borderRadius:
                        (DEFAULT_NODE_SIZE / 4) *
                        (DEFAULT_NODE_SIZE / node.level),
                      height: DEFAULT_NODE_SIZE / node.level,
                      left:
                        (node.x || 0) +
                        translation.x -
                        DEFAULT_NODE_SIZE / 2 / node.level,
                      top:
                        (node.y || 0) +
                        translation.y -
                        DEFAULT_NODE_SIZE / 2 / node.level,
                      width: DEFAULT_NODE_SIZE / node.level,
                    },
                  ]}
                  source={
                    imageLoaded[node.id]
                      ? imageSource
                      : require("../../../assets/default_profile_picture.png")
                  }
                  onLoad={() => handleImageLoad(node.id)}
                  onError={() => handleImageError(node.id)}
                />
                <Circle
                  key={"mask" + index}
                  cx={(node.x || 0) + translation.x}
                  cy={(node.y || 0) + translation.y}
                  r={DEFAULT_NODE_SIZE / node.level}
                  fill={transparent}
                  testID={"node-" + node.id}
                  {...panResponderRefs.current.get(node.id)?.panHandlers}
                />
                {node.id !== constrainedNodeId && (
                  <SVGText
                    key={node.id + "text"}
                    x={(node.x || 0) + translation.x}
                    y={
                      (node.y || 0) +
                      translation.y +
                      DEFAULT_NODE_SIZE / node.level +
                      NODE_TEXT_VERTICAL_OFFSET
                    }
                    textAnchor="middle"
                    testID={"text-" + node.id}
                    fontSize={styles.profileName.fontSize / node.level}
                    fontFamily={globalStyles.text.fontFamily}
                  >
                    {node.contact.firstName + " " + node.contact.lastName}
                  </SVGText>
                )}
              </G>
            )
          })}
        </G>
      </Svg>
    </View>
  )
}

export default ForceDirectedGraph

export { SimulationParameters }
