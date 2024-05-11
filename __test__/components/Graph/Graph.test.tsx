import Graph, {
  addNode,
  deleteNode,
  getLinks,
  getNodes,
} from "../../../components/Graph/Graph"

import { mockContacts } from "../../../screens/Contacts/mockContacts"

describe("Graph", () => {
  let contacts = mockContacts
  let userId = "0"

  beforeEach(() => {
    contacts = mockContacts
    userId = "0"
  })

  it("should create a graph with nodes and links", () => {
    const graph = new Graph(contacts, userId)
    expect(graph).toBeDefined()
  })

  it("should throw an error for invalid constructor arguments", () => {
    expect(() => new Graph([], userId)).toThrow()
  })

  it("should add a node to the graph", () => {
    const graph = new Graph(contacts, userId)
    const tempNodesLength = getNodes(graph).length
    const newNode = {
      id: "10",
      x: 0,
      y: 0,
      dx: 0,
      dy: 0,
      contact: {
        uid: "10",
        firstName: "John",
        lastName: "Doe",
        profilePictureUrl: "",
        description: "",
        location: "",
        interests: [],
        events: [],
        friends: ["1"],
      },
      level: 2,
    }
    addNode(graph, newNode)

    expect(getNodes(graph).length).toEqual(tempNodesLength + 1)
  })

  it("should remove a node and its links from the graph", () => {
    const graph = new Graph(contacts, userId)
    const tempNodes = getNodes(graph)
    const tempLinks = getLinks(graph)
    deleteNode(graph, userId)
    expect(getNodes(graph).length).toBeLessThan(tempNodes.length)
    expect(getLinks(graph).length).toBeLessThan(tempLinks.length)
  })
})
