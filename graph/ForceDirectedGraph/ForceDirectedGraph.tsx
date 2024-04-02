import React, { useEffect, useState, useRef } from "react";
import { View, Dimensions, Text, StyleSheet } from "react-native";
import Svg, { Circle, Line, G } from "react-native-svg";
import Graph, { Link, Node } from "../Graph";
import { fruchtermanReingold } from "../graph-algorithms/fruchtermanReingold";
import {
  PanGestureHandler,
  PinchGestureHandler,
  State,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

const SHORT_PRESS_DURATION = 100;

const DEFAULT_NODE_SIZE = 10;
const DEFAULT_NODE_SIZE_INCREMENT = 2;

const DEFAULT_NODE_COLOR = "blue";
const CONSTRAINED_NODE_COLOR = "red";

const DEFAULT_LINK_COLOR = "black";

const DEFAULT_CLICKED_NODE_ID = "";

const MAX_ITERATIONS = 1000;

const ForceDirectedGraph: React.FC<{
  graph: Graph;
  constrainedNodeId: string;
}> = ({ graph, constrainedNodeId }) => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [links, setLinks] = useState<Link[]>([]);
  const [sizes, setSizes] = useState<Map<string, number>>(new Map());
  const [load, setLoad] = useState<boolean>(false);
  const [dragEnabled, setDragEnabled] = useState(true); // Toggle drag
  const [clickedNodeID, setClickedNodeID] = useState<string>(
    DEFAULT_CLICKED_NODE_ID
  ); // Node ID of clicked node
  const [totalOffset, setTotalOffset] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [lastScale, setLastScale] = useState(1); // Add state to keep track of last scale

  const pressStartRef = useRef(0);

  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;

  const panRef = useRef(null);
  const pinchRef = useRef(null);

  useEffect(() => {
    const initialLinks = graph.getLinks();
    const initialNodes = graph.getNodes();
    const initialSizes = nodesSizesInit([...initialLinks]);
    setLinks([...initialLinks]);

    setNodes(
      fruchtermanReingold(
        [...initialNodes],
        initialLinks,
        constrainedNodeId,
        screenWidth,
        screenHeight,
        MAX_ITERATIONS
      )
    );
    setSizes(initialSizes);
    setLoad(true);
    return () => {
      setLinks([]);
      setNodes([]);
      setSizes(new Map());
      setLoad(false);
    };
  }, [graph, constrainedNodeId, screenWidth, screenHeight]);

  // Update the draggable state of the whole graph when a node is clicked
  useEffect(() => {
    setDragEnabled(clickedNodeID === DEFAULT_CLICKED_NODE_ID);
  }, [clickedNodeID]);

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
    if (Date.now() - pressStartRef.current < SHORT_PRESS_DURATION) {
      shortPressCallback();
    }
  };

  // If the graph is not loaded, display a loading message
  if (!load) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

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

  const circleFill = (node: Node): string => {
    if (node.id === constrainedNodeId) {
      return CONSTRAINED_NODE_COLOR;
    }
    return DEFAULT_NODE_COLOR;
  };
  const LINES = links.map((link) => (
    <Line
      key={link.source + link.target}
      x1={coordX(nodes.find((node) => node.id === link.source) ?? {x: screenWidth/2, y: screenHeight/2, id: link.source, dx: 0, dy: 0})}
      y1={coordY(nodes.find((node) => node.id === link.source) ?? {x: screenWidth/2, y: screenHeight/2, id: link.source, dx: 0, dy: 0})}
      x2={coordX(nodes.find((node) => node.id === link.target) ?? {x: screenWidth/2, y: screenHeight/2, id: link.target, dx: 0, dy: 0})}
      y2={coordY(nodes.find((node) => node.id === link.target) ?? {x: screenWidth/2, y: screenHeight/2, id: link.target, dx: 0, dy: 0})}
      stroke={DEFAULT_LINK_COLOR}
    />
  ));

  const CIRCLES = nodes.map((node) => (
    <Circle
      key={node.id}
      cx={coordX(node)}
      cy={coordY(node)}
      r={sizes.get(node.id) ?? DEFAULT_NODE_SIZE}
      fill={circleFill(node)}
      onPressIn={() =>
        handlePressIn(() => {
          pressStartRef.current = Date.now();
          setClickedNodeID(node.id);
        })
      }
      onPressOut={() =>
        handlePressOut(() => {
          setClickedNodeID(DEFAULT_CLICKED_NODE_ID);
        })
      }
    />
  ));

  const GRAPH_CANVAS = (
    <View style={styles.container}>
      <Svg width={screenWidth} height={screenHeight}>
        <G scale={scale} originX={screenWidth / 2} originY={screenHeight / 2}>
          {LINES}
          {CIRCLES}
        </G>
      </Svg>
    </View>
  );

  const PAN_GESTURE_HANDLER = (
    <PanGestureHandler
      ref={panRef}
      onGestureEvent={handlePanGestureEvent}
      onHandlerStateChange={handlePanHandlerStateChange}
      minPointers={1}
      maxPointers={1}
      simultaneousHandlers={pinchRef}
    >
      {GRAPH_CANVAS}
    </PanGestureHandler>
  );

  const PINCH_GESTURE_HANDLER = (
    <PinchGestureHandler
      ref={pinchRef}
      onGestureEvent={handlePinchGestureEvent}
      onHandlerStateChange={handlePinchHandlerStateChange}
      simultaneousHandlers={panRef}
    >
      {PAN_GESTURE_HANDLER}
    </PinchGestureHandler>
  );
  return (
    <GestureHandlerRootView style={styles.container}>
      {PINCH_GESTURE_HANDLER}
    </GestureHandlerRootView>
  );
};

export default ForceDirectedGraph;

function nodesSizesInit(links: Link[]): Map<string, number> {
  const sizes = new Map<string, number>();

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

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
});