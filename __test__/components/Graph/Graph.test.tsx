import Graph, {
  addLink,
  addNode,
  deleteLink,
  deleteNode,
  getLinks,
  getNodes,
} from "../../../components/Graph/Graph"
import Contact from "../../../screens/Contacts/Contact"

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
    expect(getNodes(graph).length).toEqual(contacts.length)
  })

  it("should throw an error for invalid constructor arguments", () => {
    expect(() => new Graph([], userId)).toThrow()
  })

  it("should add a node to the graph", () => {
    const graph = new Graph(contacts, userId)
    const newNode = {
      id: "10",
      x: 0,
      y: 0,
      dx: 0,
      dy: 0,
      contact: new Contact("10", "John", "Doe", "", "", "", [], [], []),
      level: 1,
    }
    addNode(graph, newNode)

    expect(getNodes(graph).length).toEqual(contacts.length + 1)
  })

  it("should add a link to the graph", () => {
    const graph = new Graph(contacts, userId)

    const tempLinksLength = getLinks(graph).length
    addLink(graph, "0", "10")
    expect(getLinks(graph).length).toBeGreaterThan(tempLinksLength)
  })

  it("should remove a node and its links from the graph", () => {
    const graph = new Graph(contacts, userId)
    const tempLinks = getLinks(graph)
    deleteNode(graph, userId)
    expect(getNodes(graph).length).toBeLessThan(contacts.length)
    expect(getLinks(graph).length).toBeLessThan(tempLinks.length)
  })

  it("should remove a link from the graph", () => {
    const graph = new Graph(contacts, userId)

    let tempLinksLength = getLinks(graph).length
    addLink(graph, userId, "10")
    expect(getLinks(graph).length).toBeGreaterThan(tempLinksLength)
    tempLinksLength = getLinks(graph).length

    deleteLink(graph, userId, "10")
    expect(getLinks(graph).length).toBeLessThan(tempLinksLength)
  })
})
