import Graph from "../../../components/Graph/Graph"

describe("Graph", () => {
  let ids: string[]
  let sources: string[]
  let targets: string[]
  let strengths: number[]

  beforeEach(() => {
    ids = ["A", "B", "C"]
    sources = ["A", "B"]
    targets = ["B", "C"]
    strengths = [1, 2]
  })

  it("should create a graph with nodes and links", () => {
    const graph = new Graph(ids, sources, targets, strengths)
    expect(graph.getNodes().length).toEqual(ids.length)
    expect(graph.getLinks().length).toEqual(sources.length)
  })

  it("should throw an error for invalid constructor arguments", () => {
    expect(() => new Graph([], sources, targets, strengths)).toThrow()
    expect(() => new Graph(ids, [], targets, strengths)).toThrow()
    expect(() => new Graph(ids, ["A"], targets, strengths)).toThrow()
  })

  it("should add a node to the graph", () => {
    const graph = new Graph(ids, sources, targets, strengths)
    graph.addNode("D")
    expect(graph.getNodes().length).toEqual(ids.length + 1)
    expect(graph.getNodes().some((node) => node.id === "D")).toBeTruthy()
  })

  it("should add a link to the graph", () => {
    const graph = new Graph(ids, sources, targets, strengths)
    graph.addLink("A", "C", 3)
    expect(graph.getLinks().length).toEqual(sources.length + 1)
    expect(
      graph
        .getLinks()
        .some((link) => link.source === "A" && link.target === "C")
    ).toBeTruthy()
  })

  it("should remove a node and its links from the graph", () => {
    const graph = new Graph(ids, sources, targets, strengths)
    graph.removeNode("B")
    expect(graph.getNodes().length).toEqual(ids.length - 1)
    expect(graph.getLinks().length).toEqual(0) // Assuming all links involved 'B'
  })

  it("should remove a link from the graph", () => {
    const graph = new Graph(ids, sources, targets, strengths)
    graph.removeLink("A", "B")
    expect(graph.getLinks().length).toEqual(sources.length - 1)
    expect(
      graph
        .getLinks()
        .some((link) => link.source === "A" && link.target === "B")
    ).toBeFalsy()
  })
})
