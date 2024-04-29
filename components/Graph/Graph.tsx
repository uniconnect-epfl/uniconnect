import { Contact } from "../../types/Contact"

/**
 * Interface for a node in the graph
 * @param id - The unique identifier of the node
 * @param x - The x-coordinate of the node
 * @param y - The y-coordinate of the node
 * @param dx - The x-coordinate dispalcement of the node from the previous position
 * @param dy - The y-coordinate dispalcement of the node from the previous position
 * @param selected - Whether the node is selected
 * @param contact - The contact associated with the node
 * @param level - The level of the node in the graph (i.e. how many degrees of separation from the user)
 */
interface Node {
  id: string
  x: number
  y: number
  dx: number
  dy: number
  selected?: boolean
  contact: Contact
  level: number
}

/**
 * Interface for a link in the graph
 * @param source - The unique identifier of the source node
 * @param target - The unique identifier of the target node
 */
interface Link {
  source: string
  target: string
}

/**
 * Class representing a graph
 * @param nodes - The nodes in the graph
 * @param links - The links in the graph
 * @param initialized - Whether the graph has been initialized
 */
export default class Graph {
  nodes: Node[]
  links: Link[]
  initialized: boolean

  /**
   * Constructor for the Graph class
   * @param contacts - The contacts of the user
   * @param userId - The unique identifier of the user
   */
  constructor(contacts: Contact[], userId: string) {
    this.nodes = []
    this.links = []
    this.initialized = false

    // Add the user to the graph as the root node
    const user = contacts.find((contact) => contact.uid === userId) as Contact

    // If the user is not found in the contacts, throw an error
    if (!user) {
      throw new Error("User not found in contacts")
    }

    this.nodes.push({
      id: userId,
      x: 0,
      y: 0,
      dx: 0,
      dy: 0,
      contact: user,
      level: 1,
    })

    // Create a set to keep track of visited nodes to avoid duplicates
    const visited = new Set<string>()
    visited.add(userId)

    // Add the friends of the user
    if (user.friends) {
      for (const friendId of user.friends) {
        // If the friend has already been visited, skip to the next friend
        if (visited.has(friendId)) {
          continue
        }

        // Find the friend in the provided contacts
        const friend = contacts.find(
          (contact) => contact.uid === friendId
        ) as Contact

        // If the friend is not found, skip to the next friend
        if (!friend) continue

        // Mark the friend as visited
        visited.add(friendId)

        // Add the friend to the graph
        this.nodes.push({
          id: friendId,
          x: 0,
          y: 0,
          dx: 0,
          dy: 0,
          contact: friend,
          level: 2,
        })

        // Add a link between the user and the friend
        this.links.push({
          source: userId,
          target: friendId,
        })
      }

      // Add the friends of the friends of the user
      for (const friendId of user.friends) {
        // Find the friend in the provided contacts
        const friend = contacts.find(
          (contact) => contact.uid === friendId
        ) as Contact

        // If the friend is not found, skip to the next friend
        if (!friend) {
          continue
        }

        if (!friend.friends) {
          continue
        }
        // For each friend of the friend, add the friend to the graph and a link between the friend and the friend of the friend
        for (const friendOfFriendId of friend.friends) {
          // If the friend of the friend has already been visited, skip to the next friend of the friend
          if (visited.has(friendOfFriendId)) {
            continue
          }

          // Find the friend of the friend in the provided contacts
          const friendOfFriend = contacts.find(
            (contact) => contact.uid === friendOfFriendId
          ) as Contact

          // If the friend of the friend is not found, skip to the next friend of the friend
          if (!friendOfFriend) {
            continue
          }

          // Mark the friend of the friend as visited
          visited.add(friendOfFriendId)

          // Add the friend of the friend to the graph
          this.nodes.push({
            id: friendOfFriendId,
            x: 0,
            y: 0,
            dx: 0,
            dy: 0,
            contact: friendOfFriend,
            level: 3,
          })

          // Add a link between the friend and the friend of the friend
          this.links.push({
            source: friendId,
            target: friendOfFriendId,
          })
        }
      }
    }
  }
}

/**
 * Function to add a node to the graph
 * @param graph - The graph
 * @param node - The node to add
 * @returns void
 */
function addNode(graph: Graph, node: Node): void {
  graph.nodes.push(node)
}

/**
 * Function to add a link to the graph
 * @param graph - The graph
 * @param source - The unique identifier of the source node
 * @param target - The unique identifier of the target node
 * @returns void
 */
function addLink(graph: Graph, source: string, target: string): void {
  graph.links.push({ source, target })
}

/**
 * Function to get a node by its unique identifier
 * @param graph - The graph
 * @param id - The unique identifier of the node
 * @returns The node with the specified unique identifier
 */
function getNodeById(graph: Graph, id: string): Node {
  return graph.nodes.find((node) => node.id === id) as Node
}

/**
 * Function to get the nodes in the graph
 * @param graph - The graph
 * @returns The nodes in the graph
 */
function getNodes(graph: Graph): Node[] {
  return graph.nodes
}

/**
 * Function to delete a node from the graph
 * @param graph - The graph
 * @param id - The unique identifier of the node
 * @returns void
 */
function deleteNode(graph: Graph, id: string) {
  graph.nodes = graph.nodes.filter((node) => node.id !== id)
  graph.links = graph.links.filter(
    (link) => link.source !== id && link.target !== id
  )
}

/**
 * Function to delete a link from the graph
 * @param graph - The graph
 * @param source - The unique identifier of the source node
 * @param target - The unique identifier of the target node
 * @returns void
 */
function deleteLink(graph: Graph, source: string, target: string) {
  graph.links = graph.links.filter(
    (link) => link.source !== source || link.target !== target
  )
}

/**
 * Function to get a link by the unique identifiers of the source and target nodes
 * @param graph - The graph
 * @param source - The unique identifier of the source node
 * @param target - The unique identifier of the target node
 * @returns The link with the specified unique identifiers of the source and target nodes
 */
function getLink(graph: Graph, source: string, target: string): Link {
  return graph.links.find(
    (link) => link.source === source && link.target === target
  ) as Link
}

/**
 * Function to get the links in the graph
 * @param graph - The graph
 * @returns The links in the graph
 */
function getLinks(graph: Graph): Link[] {
  return graph.links
}

/**
 * Function to get whether the graph has been initialized
 * @param graph - The graph
 * @returns Whether the graph has been initialized
 */
function getInitialized(graph: Graph): boolean {
  return graph.initialized
}

/**
 * Function to set whether the graph has been initialized
 * @param graph - The graph
 * @param initialized - Whether the graph has been initialized
 * @returns void
 */
function setInitialized(graph: Graph, initialized: boolean) {
  graph.initialized = initialized
}

export {
  Node,
  Link,
  addNode,
  addLink,
  getNodeById,
  getNodes,
  deleteNode,
  deleteLink,
  getLink,
  getLinks,
  getInitialized,
  setInitialized,
}
