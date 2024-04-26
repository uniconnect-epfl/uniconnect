import { Node, Link } from "../Graph"

/**
 *
 * @description Fruchterman-Reingold algorithm for force-directed graph drawing
 * @param nodes - Array of nodes
 * @param links - Array of links
 * @param constrainedNodeId - Identifier of the node to be constrained to the center
 * @param width - Width of the graph
 * @param height - Height of the graph
 * @param iterations - Number of iterations
 * @returns - Array of nodes with updated positions
 */
export const fruchtermanReingold = (
  nodes: Node[],
  links: Link[],
  constrainedNodeId: string,
  width: number,
  height: number,
  iterations: number
) => {
  // Maximum distance between nodes
  const k = Math.sqrt((width * height) / nodes.length) / 2

  // Randomly initialize node positions
  initializePositions(nodes, width, height)

  // Initialize temperature and cooling rate
  let temperature = width / 10
  const cooling = temperature / iterations

  // Perform iterations
  for (let i = 0; i < iterations; i++) {
    // Calculate repulsive forces
    repulsiveForces(nodes, k)

    // Calculate attractive forces
    attractiveForces(nodes, links, k)

    // Update node positions
    updatePositions(nodes, temperature, width, height, constrainedNodeId)

    // Cool down temperature
    temperature -= cooling
  }

  return nodes
}

/**
 *
 * @description Initialize node positions randomly
 * @param nodes - Array of nodes
 * @param width - Width of the graph
 * @param height - Height of the graph
 */
const initializePositions = (
  nodes: Node[],
  width: number,
  height: number
): void => {
  for (const node of nodes) {
    node.x = Math.random() * width
    node.y = Math.random() * height
  }
}

/**
 * @description Calculate repulsive forces between nodes
 * @param nodes - Array of nodes
 * @param k - Maximum distance between nodes
 */
const repulsiveForces = (nodes: Node[], k: number): void => {
  for (const node of nodes) {
    // Reset displacement
    node.dx = 0
    node.dy = 0

    // Calculate displacement
    for (const otherNode of nodes) {
      // Skip if the nodes are the same
      if (node != otherNode) {
        const dx = node.x - otherNode.x
        const dy = node.y - otherNode.y
        const distance = distanceBetween(
          node.x,
          node.y,
          otherNode.x,
          otherNode.y
        )

        // Skip if the nodes are too close
        if (distance != 0) {
          const force = repulsiveForce(distance, k) / distance
          node.dx += dx * force
          node.dy += dy * force
        }
      }
    }
  }
}

/**
 * @description Calculate attractive forces between nodes
 * @param nodes - Array of nodes
 * @param links - Array of links
 * @param k - Maximum distance between nodes
 */
const attractiveForces = (nodes: Node[], links: Link[], k: number): void => {
  for (const link of links) {
    // Retrieve source and target nodes
    const source = nodes.find((node) => node.id === link.source)
    const target = nodes.find((node) => node.id === link.target)

    // Calculate displacement if both nodes exist
    if (source && target) {
      const distance = distanceBetween(source.x, source.y, target.x, target.y)

      // Skip if the nodes are too close
      if (distance != 0) {
        const force = attractiveForce(distance, k) / distance
        source.dx += (target.x - source.x) * force
        source.dy += (target.y - source.y) * force
        target.dx -= (target.x - source.x) * force
        target.dy -= (target.y - source.y) * force
      }
    }
  }
}

/**
 * @description Update node positions based on forces
 * @param nodes - Array of nodes
 * @param temperature - Current temperature
 * @param width - Width of the graph
 * @param height - Height of the graph
 * @param constrainedNodeId - Identifier of the node to be constrained to the center
 */
const updatePositions = (
  nodes: Node[],
  temperature: number,
  width: number,
  height: number,
  constrainedNodeId: string
): void => {
  for (const node of nodes) {
    // Constrain node to the center
    if (node.id === constrainedNodeId) {
      node.x = width / 2
      node.y = height / 2
      continue
    }

    // Calculate displacement
    const distance = distanceBetween(0, 0, node.dx, node.dy)

    // Skip if the node is too close
    if (distance > 0) {
      // Calculate ratio of displacement, limited to temperature, to distance
      const ratio = Math.min(distance, temperature) / distance

      // Update node position
      node.x += node.dx * ratio
      node.y += node.dy * ratio
    }
  }
}

/**
 *
 * @description Calculate attractive force between two nodes
 * @param distance - Distance between the nodes
 * @returns - Attractive force
 */
const attractiveForce = (distance: number, k: number): number =>
  distance ** 2 / k

/**
 *
 * @description Calculate repulsive force between two nodes inversely proportional to distance
 * @param distance - Distance between the nodes
 * @returns - Repulsive force
 */
const repulsiveForce = (distance: number, k: number): number =>
  k ** 2 / distance

/**
 *
 * @description Calculate Euclidean distance between two points
 * @param x1 - X-coordinate of the first point
 * @param y1 - Y-coordinate of the first point
 * @param x2 - X-coordinate of the second point
 * @param y2 - Y-coordinate of the second point
 * @returns - Euclidean distance
 */
const distanceBetween = (
  x1: number,
  y1: number,
  x2: number,
  y2: number
): number => Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2)
