import Contact from "../../screens/Contacts/Contact"

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

interface Link {
  source: string
  target: string
}

export default class Graph {
  nodes: Node[]
  links: Link[]
  initialized: boolean

  constructor(contacts: Contact[], userId: string) {
    this.nodes = []
    this.links = []
    this.initialized = false

    // Add the user node
    const user = contacts.find((contact) => contact.uid === userId) as Contact
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

    const visited = new Set<string>()
    // Add the user's friends
    for (const friendId of user.friends) {
      const friend = contacts.find(
        (contact) => contact.uid === friendId
      ) as Contact
      if (!friend) {
        continue
      }
      visited.add(friendId)
      this.nodes.push({
        id: friendId,
        x: 0,
        y: 0,
        dx: 0,
        dy: 0,
        contact: friend,
        level: 2,
      })
      this.links.push({
        source: userId,
        target: friendId,
      })
    }

    // Add the friends of the user's friends
    for (const friendId of user.friends) {
      const friend = contacts.find(
        (contact) => contact.uid === friendId
      ) as Contact
      if (!friend) {
        continue
      }
      for (const friendOfFriendId of friend.friends) {
        if (visited.has(friendOfFriendId)) {
          continue
        }
        const friendOfFriend = contacts.find(
          (contact) => contact.uid === friendOfFriendId
        ) as Contact
        if (!friendOfFriend) {
          continue
        }
        visited.add(friendOfFriendId)
        this.nodes.push({
          id: friendOfFriendId,
          x: 0,
          y: 0,
          dx: 0,
          dy: 0,
          contact: friendOfFriend,
          level: 3,
        })
        this.links.push({
          source: friendId,
          target: friendOfFriendId,
        })
      }
    }
  }
}

function addNode(graph: Graph, node: Node): void {
  graph.nodes.push(node)
}

function addLink(graph: Graph, source: string, target: string): void {
  graph.links.push({ source, target })
}

function getNodeById(graph: Graph, id: string): Node {
  return graph.nodes.find((node) => node.id === id) as Node
}

function getNodes(graph: Graph): Node[] {
  return graph.nodes
}

function deleteNode(graph: Graph, id: string) {
  graph.nodes = graph.nodes.filter((node) => node.id !== id)
  graph.links = graph.links.filter(
    (link) => link.source !== id && link.target !== id
  )
}

function deleteLink(graph: Graph, source: string, target: string) {
  graph.links = graph.links.filter(
    (link) => link.source !== source || link.target !== target
  )
}

function getLink(graph: Graph, source: string, target: string): Link {
  return graph.links.find(
    (link) => link.source === source && link.target === target
  ) as Link
}

function getLinks(graph: Graph): Link[] {
  return graph.links
}

function getInitialized(graph: Graph): boolean {
  return graph.initialized
}

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
