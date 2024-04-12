import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, View, Dimensions } from "react-native";
import Svg, { Circle, G, Line, Text as SVGText, Image } from "react-native-svg";

import styles from "./styles";
import Graph, { Link, Node } from "../Graph";
import { fruchtermanReingold } from "../graphAlgorithms/FruchtermanReingold";

import {
  PanGestureHandler,
  PinchGestureHandler,
  State,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

const VERY_SHORT_PRESS_DURATION = 50;
const SHORT_PRESS_DURATION = 100;
const NODE_HITBOX_SIZE = 20; // Hitbox size of the nodes
const DEFAULT_NODE_SIZE = 10; // Default size of the nodes
const DEFAULT_NODE_SIZE_INCREMENT = 2; // Increment in the size of the nodes

const DEFAULT_LINK_COLOR = "black"; // Default color of the links
const DEFAULT_CLICKED_NODE_ID = "";

const MAX_ITERATIONS = 1000; // Maximum number of iterations for the used algorithn

const WIDTH = Dimensions.get("window").width; // Width of the screen
const HEIGHT = Dimensions.get("window").height; // Height of the screen
const CENTER_WIDTH = WIDTH / 2; // Center X-coordinates of the screen
const CENTER_HEIGHT = HEIGHT / 2; // Center Y-coordinates of the screen

/**
 *
 * @description Force-directed graph component
 * @param graph - Graph object
 * @param constrainedNodeId - Identifier of the node to be constrained to the center
 * @returns - Force-directed graph component
 */
const ForceDirectedGraph: React.FC<{graph: Graph, constrainedNodeId: string}> = ({graph, constrainedNodeId}) => {

  // States to store the nodes, links, sizes and loading status
  const [nodes, setNodes] = useState<Node[]>([]);
  const [links, setLinks] = useState<Link[]>([]);
  const [sizes, setSizes] = useState<Map<string, number>>(new Map());
  const [load, setLoad] = useState<boolean>(false);

  // State to store the total offset when dragging the graph
  const [totalOffset, setTotalOffset] = useState({ x: 0, y: 0 });
  const [dragEnabled, setDragEnabled] = useState(true); // Toggle drag
  const [clickedNodeID, setClickedNodeID] = useState<string>(
    DEFAULT_CLICKED_NODE_ID
  ); // Node ID of clicked node
  const [scale, setScale] = useState(1);
  const [lastScale, setLastScale] = useState(1); // Add state to keep track of last scale

  const pressStartRef = useRef(0);

  const panRef = useRef(null);
  const pinchRef = useRef(null);

  // Use effect to update the graph
  useEffect(() => {
    // Get the initial links, nodes and sizes
    const initialLinks = graph.getLinks();
    const initialNodes = graph.getNodes();
    const initialSizes = setNodesSizes([...initialLinks]);
    // Set the links, nodes and sizes
    setLinks([...initialLinks]);
    setNodes(
      fruchtermanReingold(
        [...initialNodes],
        initialLinks,
        constrainedNodeId,
        WIDTH,
        HEIGHT,
        MAX_ITERATIONS
      )
    );
    setSizes(initialSizes);
    setLoad(true);
  }, [graph, constrainedNodeId]);

  // Update the draggable state of the whole graph when a node is clicked
  useEffect(() => {
    setDragEnabled(clickedNodeID === DEFAULT_CLICKED_NODE_ID);
  }, [clickedNodeID]);

  // If the graph is not loaded, display an activity indicator
  if (!load) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  // Handle Dragging
  const handlePanGestureEvent = (event: {
    nativeEvent: { translationX: number; translationY: number };
  }) => {
    setTotalOffset({
      x: event.nativeEvent.translationX / lastScale,
      y: event.nativeEvent.translationY / lastScale,
    });
  };

  // Handle Dragging State Change
  const handlePanHandlerStateChange = (event: {
    nativeEvent: { state: number };
  }) => {
    if (event.nativeEvent.state === State.END) {
      setNodes(
        nodes.map((node) => ({
          ...node,
          x: coordX(node),
          y: coordY(node),
        }))
      );

      if (!dragEnabled) {
        setClickedNodeID(DEFAULT_CLICKED_NODE_ID);
      }
      setTotalOffset({ x: 0, y: 0 });
    }
  };

  // Handle Zooming
  const handlePinchGestureEvent = (event: {
    nativeEvent: { scale: React.SetStateAction<number> };
  }) => {
    setScale(Number(event.nativeEvent.scale) * Number(lastScale));
  };

  const handlePinchHandlerStateChange = (event: {
    nativeEvent: { state: number };
  }) => {
    if (event.nativeEvent.state === State.END) {
      setLastScale(scale);
    }
  };

  // Handle PRESS IN
  const handlePressIn = (onPressCallback = () => {}) => {
    onPressCallback();
  };

  // Handle PRESS OUT
  const handlePressOut = (shortPressCallback = () => {}) => {
    if (
      Date.now() - pressStartRef.current < SHORT_PRESS_DURATION &&
      Date.now() - pressStartRef.current > VERY_SHORT_PRESS_DURATION
    ) {
      shortPressCallback();
    }
  };

  // Functions to get the X and Y coordinates of the nodes and the fill color of the nodes
  const coordX = (node: Node): number => {
    if (dragEnabled || clickedNodeID === node.id) {
      return node.x + totalOffset.x;
    }
    return node.x;
  };

  const coordY = (node: Node): number => {
    if (dragEnabled || clickedNodeID === node.id) {
      return node.y + totalOffset.y;
    }
    return node.y;
  };

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
        }
      )}
      y1={coordY(
        nodes.find((node) => node.id === link.source) ?? {
          x: CENTER_WIDTH,
          y: CENTER_HEIGHT,
          id: link.source,
          dx: 0,
          dy: 0,
        }
      )}
      x2={coordX(
        nodes.find((node) => node.id === link.target) ?? {
          x: CENTER_WIDTH,
          y: CENTER_HEIGHT,
          id: link.target,
          dx: 0,
          dy: 0,
        }
      )}
      y2={coordY(
        nodes.find((node) => node.id === link.target) ?? {
          x: CENTER_WIDTH,
          y: CENTER_HEIGHT,
          id: link.target,
          dx: 0,
          dy: 0,
        }
      )}
      stroke={DEFAULT_LINK_COLOR}
    />
  ));

  const CIRCLES = nodes.map((node) => (
    <G key={node.id + "group"}>
      <Circle
        key={node.id + "circle"}
        cx={coordX(node)}
        cy={coordY(node)}
        r={(sizes.get(node.id) ?? DEFAULT_NODE_SIZE) + NODE_HITBOX_SIZE}
        fill={"transparent"}
        onPressIn={() =>
          handlePressIn(() => {
            pressStartRef.current = Date.now();
            setClickedNodeID(node.id);
          })
        }
        onPressOut={() =>
          handlePressOut(() => {
            console.warn("Short Press");
            setClickedNodeID(DEFAULT_CLICKED_NODE_ID);
          })
        }
      />
      <Image
        key={node.id + "image"}
        x={coordX(node) - (sizes.get(node.id) ?? DEFAULT_NODE_SIZE)}
        y={coordY(node) - (sizes.get(node.id) ?? DEFAULT_NODE_SIZE)}
        width={2 * (sizes.get(node.id) ?? DEFAULT_NODE_SIZE)}
        height={2 * (sizes.get(node.id) ?? DEFAULT_NODE_SIZE)}
        href={require("../../assets/graph-template-profile-picture.png")} // Replace with your image path
        clipPath={"url(#clip" + node.id + ")"}
      />
      <SVGText
        key={node.id + "text"}
        x={coordX(node)} // Align horizontally with the center of the circle
        y={
          coordY(node) +
          (sizes.get(node.id) ?? DEFAULT_NODE_SIZE) +
          DEFAULT_NODE_SIZE
        } // Position below the circle; adjust 10 as needed
        textAnchor="middle" // Center the text under the circle
      >
        {node.id}
      </SVGText>
    </G>
  ));

  return (
    <GestureHandlerRootView style={styles.container}>
      <PinchGestureHandler
        ref={pinchRef}
        onGestureEvent={handlePinchGestureEvent}
        onHandlerStateChange={handlePinchHandlerStateChange}
        simultaneousHandlers={panRef}
      >
        <PanGestureHandler
          ref={panRef}
          onGestureEvent={handlePanGestureEvent}
          onHandlerStateChange={handlePanHandlerStateChange}
          minPointers={1}
          maxPointers={1}
          simultaneousHandlers={pinchRef}
        >
          <View style={styles.container}>
            <Svg width={WIDTH} height={HEIGHT}>
              <G scale={scale} originX={CENTER_WIDTH} originY={CENTER_HEIGHT}>
                {LINES}
                {CIRCLES}
              </G>
            </Svg>
          </View>
        </PanGestureHandler>
      </PinchGestureHandler>
    </GestureHandlerRootView>
  );
};

export default ForceDirectedGraph;

/**
 *
 * @description Sets the sizes of the nodes
 * @param links - Links in the graph
 * @returns - Map of node identifiers to their sizes
 */
function setNodesSizes(links: Link[]): Map<string, number> {
  // Initialize the sizes
  const sizes = new Map<string, number>();

  // Increment the size of the nodes based on the links
  for (const link of links) {
    [link.source, link.target].forEach((id) => {
      sizes.set(
        id,
        (sizes.get(id) ?? DEFAULT_NODE_SIZE) + DEFAULT_NODE_SIZE_INCREMENT
      );
    });
  }

  return sizes;
}
