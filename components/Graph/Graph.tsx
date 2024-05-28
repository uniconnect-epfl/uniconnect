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
  x?: number
  y?: number
  fx?: number | null
  fy?: number | null
  selected?: boolean
  magicSelected?: boolean
  contact: Contact
  level: number
}

/**
 * Interface for a link in the graph
 * @param source - The unique identifier of the source node
 * @param target - The unique identifier of the target node
 */
interface Link {
  source: Node
  target: Node
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
  userId: string

  /**
   * Constructor for the Graph class
   * @param contacts - The contacts of the user
   * @param userId - The unique identifier of the user
   */
  constructor(contacts: Contact[], userId: string) {
    this.nodes = []
    this.links = []
    this.userId = ""

    // Add the user to the graph as the root node
    const user = contacts.find((contact) => contact.uid === userId) as Contact

    // If the user is not found in the contacts, throw an error
    if (user !== undefined) {
      this.userId = userId

      const userNode: Node = {
        id: userId,
        contact: user,
        level: 1,
      }

      this.nodes.push(userNode)

      // Add the friends of the user
      if (user.friends) {
        for (const friendId of user.friends) {
          // Find the friend in the provided contacts
          const friend = contacts.find(
            (contact) => contact.uid === friendId
          ) as Contact

          // If the friend is not found, skip to the next friend
          if (!friend) continue

          // Add the friend to the graph
          const friendNode: Node = {
            id: friendId,
            contact: friend,
            x: userNode.x,
            y: userNode.y,
            level: 2,
          }
          this.nodes.push(friendNode)

          // Add a link between the user and the friend
          this.links.push({
            source: userNode,
            target: friendNode,
          })
        }
      }
    }
  }
}

function addContactNode(graph: Graph, contact: Contact, level: number): void {
  // Add all relevant links
  graph.nodes.push({
    id: contact.uid,
    contact,
    level,
  })
  // Add a link between the contact and its friends
  if (contact.friends) {
    for (const friendId of contact.friends) {
      if (getNodeById(graph, friendId)) {
        const contactNode = getNodeById(graph, contact.uid)
        const friendNode = getNodeById(graph, friendId)
        graph.links.push({
          source: contactNode,
          target: friendNode,
        })
      }
    }
  }
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
 * Function to delete a node from the graph
 * @param graph - The graph
 * @param id - The unique identifier of the node
 * @returns void
 */
function deleteNode(graph: Graph, id: string) {
  graph.nodes = graph.nodes.filter((node) => node.id !== id)
  graph.links = graph.links.filter((link) => {
    return link.source.id !== id && link.target.id !== id
  })
}

export { Node, Link, addContactNode, getNodeById, deleteNode }
