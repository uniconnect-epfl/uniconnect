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
  // Area of the graph
  const area = width * height 

  // Maximum distance between nodes
  const k = Math.sqrt(area / nodes.length) 

  /**
   *
   * @description Calculate attractive force between two nodes
   * @param distance - Distance between the nodes
   * @returns - Attractive force
   */
  const attractiveForce = (distance: number): number => distance ** 2 / k 

  /**
   *
   * @description Calculate repulsive force between two nodes inversely proportional to distance
   * @param distance - Distance between the nodes
   * @returns - Repulsive force
   */
  const repulsiveForce = (distance: number): number => k ** 2 / distance 

  /**
   *
   * @description Calculate Euclidean distance between two nodes
   * @param p1 - First node
   * @param p2 - Second node
   * @returns - Euclidean distance
   */
  const distanceBetween = (p1: Node, p2: Node): number =>
    Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2) 

  // Randomly initialize node positions
  for (const node of nodes) {
    node.x = Math.random() * width 
    node.y = Math.random() * height 
  }

  // Initialize temperature and cooling rate
  let temperature = width / 10 
  const cooling = temperature / (iterations + 1) 

  // Perform iterations
  for (let i = 0 ; i < iterations ; i++) {
    // Calculate repulsive forces
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
          const distance = distanceBetween(node, otherNode) 

          // Skip if the nodes are too close
          if (distance != 0) {
            const force = repulsiveForce(distance) / distance 
            node.dx += dx * force 
            node.dy += dy * force 
          }
        }
      }
    }

    // Calculate attractive forces
    for (const link of links) {
      // Retrieve source and target nodes
      const source = nodes.find((node) => node.id === link.source) 
      const target = nodes.find((node) => node.id === link.target) 

      // Calculate displacement if both nodes exist
      if (source && target) {
        const dx = target.x - source.x 
        const dy = target.y - source.y 
        const distance = distanceBetween(source, target) 

        // Skip if the nodes are too close
        if (distance != 0) {
          const force = attractiveForce(distance) / distance 
          source.dx += dx * force 
          source.dy += dy * force 
          target.dx -= dx * force 
          target.dy -= dy * force 
        }
      }
    }

    // Update node positions
    for (const node of nodes) {
      // Constrain node to the center
      if (node.id === constrainedNodeId) {
        node.x = width / 2 
        node.y = height / 2 
        continue 
      }

      // Calculate displacement
      const distance = Math.sqrt(node.dx ** 2 + node.dy ** 2) 

      // Skip if the node is too close
      if (distance != 0) {
        // Calculate ratio of displacement, limited to temperature, to distance
        const ratio = Math.min(distance, temperature) / distance 

        // Update node position
        node.x += node.dx * ratio 
        node.y += node.dy * ratio 

        // Keep node within the graph
        node.x = Math.min(width, Math.max(0, node.x)) 
        node.y = Math.min(height, Math.max(0, node.y)) 
      }
    }

    // Cool down temperature
    temperature -= cooling 
  }

  return nodes 
} 