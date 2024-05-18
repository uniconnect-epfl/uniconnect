import { fruchtermanReingold } from "../../../../components/Graph/graphAlgorithms/FruchtermanReingold"
import Graph, { getNodes, getLinks } from "../../../../components/Graph/Graph"
import { mockContacts } from "../../../../screens/Contacts/mockContacts"

describe("fruchtermanReingold", () => {
  const contacts = mockContacts
  const constrainedNodeId = "0"
  const graph = new Graph(contacts, constrainedNodeId)
  let width: number
  let height: number
  let iterations: number

  beforeEach(() => {
    width = 900
    height = 600
    iterations = 100
  })

  it("modifies node positions over iterations", () => {
    const initialGraph = JSON.stringify(graph)
    const result = fruchtermanReingold(
      getNodes(graph),
      getLinks(graph),
      constrainedNodeId,
      width,
      height,
      iterations
    )
    const finalGraph = JSON.stringify(result)
    expect(finalGraph).not.toEqual(initialGraph)
  })
})
