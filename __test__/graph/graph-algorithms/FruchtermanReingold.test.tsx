import { fruchtermanReingold } from '../../../graph/graph-algorithms/FruchtermanReingold'
import { Node, Link } from '../../../graph/Graph'

describe('fruchtermanReingold', () => {
  let nodes: Node[]
  let links: Link[]
  let constrainedNodeId: string
  let width: number
  let height: number 
  let iterations: number

  beforeEach(() => {
    nodes = [
        { id: 'node1', x: 100, y: 100, dx: 0, dy: 0 },
        { id: 'node2', x: 200, y: 200, dx: 0, dy: 0 },
        { id: 'node3', x: 300, y: 300, dx: 0, dy: 0 },
    ];

    links = [
        { source: 'node1', target: 'node2', strength: 1 },
        { source: 'node2', target: 'node3', strength: 1 },
        { source: 'node3', target: 'node1', strength: 1 },
    ];
    constrainedNodeId = 'someNodeId'
    width = 800
    height = 600
    iterations = 100
  })

  it('initializes node positions within graph dimensions', () => {
    const result = fruchtermanReingold(nodes, links, constrainedNodeId, width, height, iterations)
    result.forEach(node => {
      expect(node.x).toBeGreaterThanOrEqual(0)
      expect(node.x).toBeLessThanOrEqual(width)
      expect(node.y).toBeGreaterThanOrEqual(0)
      expect(node.y).toBeLessThanOrEqual(height)
    })
  })

  it('modifies node positions over iterations', () => {
    const initialPositions = JSON.stringify(nodes)
    const result = fruchtermanReingold(nodes, links, constrainedNodeId, width, height, iterations)
    const finalPositions = JSON.stringify(result)
    expect(finalPositions).not.toEqual(initialPositions)
  })

})
