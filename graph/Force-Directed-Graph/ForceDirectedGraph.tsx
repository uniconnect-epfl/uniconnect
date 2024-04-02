import React, { useEffect, useState} from "react";
import {ActivityIndicator, View, Dimensions, StyleSheet } from "react-native";
import Svg, { Circle, Line} from "react-native-svg";
import Graph, { Link, Node } from "../Graph";
import { fruchtermanReingold } from "../graph-algorithms/FruchtermanReingold";

const DEFAULT_NODE_SIZE = 10;
const DEFAULT_NODE_SIZE_INCREMENT = 2;

const DEFAULT_NODE_COLOR = "blue";
const CONSTRAINED_NODE_COLOR = "red";

const DEFAULT_LINK_COLOR = "black";

const MAX_ITERATIONS = 1000;

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
const CENTER_WIDTH = WIDTH / 2;
const CENTER_HEIGHT = HEIGHT / 2;

const ForceDirectedGraph: React.FC<{
  graph: Graph;
  constrainedNodeId: string;
}> = ({ graph, constrainedNodeId }) => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [links, setLinks] = useState<Link[]>([]);
  const [sizes, setSizes] = useState<Map<string, number>>(new Map());
  
  const [load, setLoad] = useState<boolean>(false);

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
        WIDTH,
        HEIGHT,
        MAX_ITERATIONS
      )
    );
    setSizes(initialSizes);
    setLoad(true);
  }, [graph, constrainedNodeId]);


  // If the graph is not loaded, display a loading message
  if (!load) {
    return (
        <ActivityIndicator size="large" color="#0000ff" />
    );
  }

  const coordX = (node: Node): number => {
    return node.x;
  };

  const coordY = (node: Node): number => {
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
      x1={coordX(nodes.find((node) => node.id === link.source) ?? {x: CENTER_WIDTH, y: CENTER_HEIGHT, id: link.source, dx: 0, dy: 0})}
      y1={coordY(nodes.find((node) => node.id === link.source) ?? {x: CENTER_WIDTH, y: CENTER_HEIGHT, id: link.source, dx: 0, dy: 0})}
      x2={coordX(nodes.find((node) => node.id === link.target) ?? {x: CENTER_WIDTH, y: CENTER_HEIGHT, id: link.target, dx: 0, dy: 0})}
      y2={coordY(nodes.find((node) => node.id === link.target) ?? {x: CENTER_WIDTH, y: CENTER_HEIGHT, id: link.target, dx: 0, dy: 0})}
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
    />
  ));

  return (
    <View style={styles.container}>
      <Svg width={WIDTH} height={HEIGHT}>
          {LINES}
          {CIRCLES}
      </Svg>
    </View>
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