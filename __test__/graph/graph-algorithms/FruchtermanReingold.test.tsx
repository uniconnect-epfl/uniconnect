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
    nodes = [/* initialize with test nodes */]
    links = [/* initialize with test links */]
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
    expect(finalPositions).not.toBe(initialPositions)
  })

})
