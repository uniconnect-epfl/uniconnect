import React, { useState, useEffect, useRef, useCallback, useMemo } from "react"
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
import Graph, { Node, Link, getNodeById } from "../Graph" // Import your Graph class and types here
import { peach, transparent } from "../../../assets/colors/colors"
import { globalStyles } from "../../../assets/global/globalStyles"
import styles from "./styles"
import { showErrorToast } from "../../ToastMessage/toast"

const { width, height } = Dimensions.get("window")

interface ForceDirectedGraphProps {
  graph: Graph
  constrainedNodeId: string
  magicNodeId: string
  onModalPress: (uid: string) => void
  onMagicPress: (uid: string) => void
}

const ForceDirectedGraph: React.FC<ForceDirectedGraphProps> = ({
  graph,
  constrainedNodeId,
  magicNodeId,
  onModalPress,
  onMagicPress,
}) => {
  const [graphState, setGraphState] = useState<{
    nodes: Node[]
    links: Link[]
  }>({
    nodes: [],
    links: [],
  })
  const [translation, setTranslation] = useState({ x: 0, y: 0 })
  const lastPan = useRef({ x: 0, y: 0 })
  const simulationRef = useRef<d3.Simulation<Node, Link>>()
  const savedStateRef = useRef<{ nodes: Node[]; links: Link[] }>({
    nodes: [],
    links: [],
  })

  const [imageLoaded, setImageLoaded] = useState<Record<string, boolean>>({})

  let clickedNodeID: string = ""
  let delay: number
  let timer: NodeJS.Timeout

  useEffect(() => {
    if (simulationRef.current) {
      updateSimulation(simulationRef.current, graph.nodes, graph.links)
    } else {
      const nodes = graph.nodes
      const links = graph.links
      const simulation = d3
        .forceSimulation(nodes)
        .force(
          "link",
          d3
            .forceLink(links)
            .id((d: Node) => d.id)
            .distance(150)
        )
        .force("charge", d3.forceManyBody().strength(-200))
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force("collide", d3.forceCollide(20))
        .on("tick", () => {
          setGraphState({ nodes: [...nodes], links: [...links] })
        })

      simulationRef.current = simulation

      return () => {
        simulation.stop()
      }
    }
  }, [graph])

  const saveSimulationState = () => {
    if (simulationRef.current) {
      savedStateRef.current = {
        nodes: [...simulationRef.current.nodes()],
        links: [...(simulationRef.current.force("link")?.links() ?? [])],
      }
    }
  }

  const restoreSimulationState = () => {
    if (simulationRef.current) {
      updateSimulation(
        simulationRef.current,
        savedStateRef.current.nodes,
        savedStateRef.current.links
      )
    }
  }

  const handleNodeDrag = useCallback(
    (
      node: Node,
      event: GestureResponderEvent,
      gestureState: PanResponderGestureState
    ) => {
      node.fx = gestureState.moveX - translation.x
      node.fy = gestureState.moveY - translation.y
      simulationRef.current?.alpha(1).restart() // Restart simulation on drag
    },
    [translation]
  )

  const handleNodeRelease = useCallback((node: Node) => {
    node.fx = null
    node.fy = null
    simulationRef.current?.alpha(1).restart() // Restart simulation on release
  }, [])

  const panResponderRefs = useRef<Map<string, PanResponderInstance>>(new Map())

  const graphPanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        setTranslation({
          x: lastPan.current.x + gestureState.dx,
          y: lastPan.current.y + gestureState.dy,
        })
      },
      onPanResponderRelease: (evt, gestureState) => {
        lastPan.current = {
          x: lastPan.current.x + gestureState.dx,
          y: lastPan.current.y + gestureState.dy,
        }
      },
    })
  ).current

  const handleMagicPress = (uid: string) => {
    saveSimulationState()
    onMagicPress(uid)
    restoreSimulationState()
  }

  const handleNodePanResponderGrant = (node: Node) => {
    if (node.id === clickedNodeID) {
      if (Date.now() - delay < 300) {
        onModalPress(node.id)
        clickedNodeID = ""
      }
    } else {
      timer = setTimeout(() => {
        Vibration.vibrate()
        if (node.outsideScreen) {
          showErrorToast("You cannot select a node outside the screen.")
        } else if (node.level > 2) {
          showErrorToast("You can only view friends of friends")
        } else {
          if (magicNodeId === "" && node.id === constrainedNodeId) {
            showErrorToast("You cannot unselect without selecting a node first")
          } else {
            handleMagicPress(node.id)
          }
        }
        clickedNodeID = ""
      }, 300)
    }
    clickedNodeID = node.id
    delay = Date.now()
  }

  const handleNodePanResponderMove = (
    node: Node,
    event: GestureResponderEvent,
    gestureState: PanResponderGestureState
  ) => {
    if (Math.abs(gestureState.dx) > 5 || Math.abs(gestureState.dy) > 5) {
      clearTimeout(timer)
    }
    handleNodeDrag(node, event, gestureState)
  }

  const handleNodePanResponderRelease = (node: Node) => {
    clearTimeout(timer)
    handleNodeRelease(node)
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

  const handleImageLoad = (nodeId: string) => {
    setImageLoaded((prev) => ({ ...prev, [nodeId]: true }))
  }

  const handleImageError = (nodeId: string) => {
    setImageLoaded((prev) => ({ ...prev, [nodeId]: false }))
  }

  return (
    <View style={styles.container} {...graphPanResponder.panHandlers}>
      <Svg height={height} width={width}>
        {graphState.links.map((link, index) => {
          const source = link.source as Node
          const target = link.target as Node
          return (
            <Line
              key={index}
              x1={(source.x || 0) + translation.x}
              y1={(source.y || 0) + translation.y}
              x2={(target.x || 0) + translation.x}
              y2={(target.y || 0) + translation.y}
              stroke="grey"
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
            <G key={"group" + index}>
              <Image
                key={index}
                style={[
                  styles.nodeImage,
                  {
                    borderColor: (getNodeById(graph, node.id) as Node).selected
                      ? peach
                      : transparent,
                    borderRadius: 20 * (80 / node.level),
                    height: 80 / node.level,
                    left: (node.x || 0) + translation.x - 40 / node.level,
                    top: (node.y || 0) + translation.y - 40 / node.level,
                    width: 80 / node.level,
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
                r={80 / node.level}
                fill={transparent}
                {...panResponderRefs.current.get(node.id)?.panHandlers}
              />
              {node.id !== constrainedNodeId && (
                <SVGText
                  key={node.id + "text"}
                  x={(node.x || 0) + translation.x}
                  y={(node.y || 0) + translation.y + 80 / node.level + 10}
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
      </Svg>
    </View>
  )
}

export default ForceDirectedGraph

// Function to update the simulation with only the necessary changes
function updateSimulation(
  simulation: d3.Simulation<Node, Link>,
  nodes: Node[],
  links: Link[]
) {
  if (simulation) {
    // Remove nodes
    const removedNodes: Node[] = simulation
      .nodes()
      .filter((node: Node) => !nodes.includes(node))
    removedNodes.forEach((node: Node) => {
      const index: number = simulation.nodes().indexOf(node)
      if (index > -1) {
        simulation.nodes().splice(index, 1)
      }
    })

    // Add nodes
    const addedNodes: Node[] = nodes.filter(
      (node: Node) => !simulation.nodes().includes(node)
    )
    addedNodes.forEach((node: Node) => {
      simulation.nodes().push(node)
    })

    // Remove links
    const removedLinks = simulation
      .force("link")
      ?.links()
      .filter((link: Link) => !links.includes(link))
    removedLinks.forEach((link: Link) => {
      const index = simulation.force("link")?.links().indexOf(link)
      if (index > -1) {
        simulation.force("link")?.links().splice(index, 1)
      }
    })

    // Add links
    const addedLinks = links.filter(
      (link: Link) => !simulation.force("link")?.links().includes(link)
    )
    addedLinks.forEach((link: Link) => {
      simulation.force("link")?.links().push(link)
    })

    simulation.alpha(1).restart() // Restart the simulation
  }
}
