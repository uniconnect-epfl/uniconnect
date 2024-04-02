import React, { useEffect, useState } from "react";
import { ActivityIndicator, View, Dimensions, StyleSheet } from "react-native";
import Svg, { Circle, Line } from "react-native-svg";

import Graph, { Link, Node } from "../Graph";
import { fruchtermanReingold } from "../graph-algorithms/FruchtermanReingold";

const DEFAULT_NODE_SIZE = 10; // Default size of the nodes
const DEFAULT_NODE_SIZE_INCREMENT = 2; // Increment in the size of the nodes

const DEFAULT_NODE_COLOR = "blue"; // Default color of the nodes
const CONSTRAINED_NODE_COLOR = "red"; // Color of the constrained node

const DEFAULT_LINK_COLOR = "black"; // Default color of the links

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
const ForceDirectedGraph: React.FC<{
  graph: Graph;
  constrainedNodeId: string;
}> = ({ graph, constrainedNodeId }) => {
  // States to store the nodes, links, sizes and loading status
  const [nodes, setNodes] = useState<Node[]>([]);
  const [links, setLinks] = useState<Link[]>([]);
  const [sizes, setSizes] = useState<Map<string, number>>(new Map());
  const [load, setLoad] = useState<boolean>(false);

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

  // If the graph is not loaded, display an activity indicator
  if (!load) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  // Functions to get the X and Y coordinates of the nodes and the fill color of the nodes
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

  // Create the lines and circles for the graph
  const LINES = links.map((link) => (
    <Line
      key={link.source + link.target}
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

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
});
