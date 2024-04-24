/**
 * Node interface
 */
interface Node {
  id: string  // Unique identifier
  x: number  // x-coordinate
  y: number  // y-coordinate
  dx: number  // x-velocity
  dy: number  // y-velocity
  selected?: boolean  // Is the node selected?
}

/**
 * Link interface
 */
interface Link {
  source: string  // Source node identifier
  target: string  // Target node identifier
  strength: number  // Strength of the link
}

/**
 *
 * @class Graph
 * @description Graph representation of the form (V, E) where V is a set of nodes and E is a set of links (edges)
 */
export default class Graph {
  // Nodes in the graph
  nodes: Node[] 

  // Links in the graph
  links: Link[] 

  // Are the node positions initialized?
  initialized: boolean


  /**
   *
   * @constructor
   * @param ids - Unique identifiers for the nodes
   * @param sources - Source node identifiers for the links
   * @param targets - Target node identifiers for the links
   * @param strengths - Strengths of the links
   */
  constructor(
    ids: string[],
    sources: string[],
    targets: string[],
    strengths: number[]
  ) {
    /**
     * @description Validate the inputs
     * @throws {Error} - If ids is empty
     * @throws {Error} - If sources is empty
     * @throws {Error} - If sources, targets, and strengths have different lengths
     */

    if (ids.length === 0) {
      throw new Error("ids must not be empty") 
    }
    if (sources.length === 0) {
      throw new Error("sources must not be empty") 
    }
    if (
      sources.length !== targets.length ||
      targets.length !== strengths.length
    ) {
      throw new Error(
        "sources, targets, and strengths must have the same length"
      ) 
    }

    // Initialize the nodes
    this.nodes = ids.map((id: string): Node => {
      return {
        id: id,
        x: 0,
        y: 0,
        dx: 0,
        dy: 0,
      } 
    }) 

    // Initialize the links
    this.links = sources.map((source: string, index: number): Link => {
      return {
        source: source,
        target: targets[index],
        strength: strengths[index],
      } 
    }) 

    // Set the node positions to be uninitialized
    this.initialized = false
  }

  getInitialized(): boolean {
    return this.initialized 
  }

  setInitialized(initialized: boolean): void {
    this.initialized = initialized 
  }

  /**
   *
   * @description Retrieve the nodes in the graph
   * @returns - The nodes in the graph
   */
  getNodes(): Node[] {
    return this.nodes 
  }

  /**
   *
   * @description Retrieve the links in the graph
   * @returns - The links in the graph
   */
  getLinks(): Link[] {
    return this.links 
  }

  /**
   *
   * @description Add a node to the graph
   * @param id - Unique identifier for the node to be added
   */
  addNode(id: string): void {
    this.nodes.push({
      id: id,
      x: 0,
      y: 0,
      dx: 0,
      dy: 0,
    }) 
    this.setInitialized(false)
  }

  /**
   *
   * @description Add a link to the graph
   * @param source - Source node identifier for the link to be added
   * @param target - Target node identifier for the link to be added
   * @param strength - Strength of the link to be added
   */
  addLink(source: string, target: string, strength: number): void {
    this.links.push({
      source: source,
      target: target,
      strength: strength,
    })
    this.setInitialized(false)
  }

  /**
   *
   * @description Remove a node from the graph and all links connected to it
   * @param id - Unique identifier for the node to be removed
   */
  removeNode(id: string): void {
    this.nodes = this.nodes.filter((node: Node): boolean => {
      return node.id !== id 
    }) 

    this.links = this.links.filter((link: Link): boolean => {
      return link.source !== id && link.target !== id 
    }) 
    this.setInitialized(false)
  }

  /**
   *
   * @description Remove a link from the graph
   * @param source - Source node identifier for the link to be removed
   * @param target - Target node identifier for the link to be removed
   */
  removeLink(source: string, target: string): void {
    this.links = this.links.filter((link: Link): boolean => {
      return link.source !== source || link.target !== target 
    }) 
    this.setInitialized(false)
  }
}

export type { Node, Link } 
