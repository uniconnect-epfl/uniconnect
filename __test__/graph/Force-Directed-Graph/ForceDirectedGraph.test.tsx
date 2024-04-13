import React from 'react'
import { render } from '@testing-library/react-native'
import ForceDirectedGraph from '../../../graph/Force-Directed-Graph/ForceDirectedGraph'
import Graph from '../../../graph/Graph'

describe('ForceDirectedGraph', () => {
  let graph: Graph
  let constrainedNodeId: string

  beforeEach(() => {
    graph = new Graph(
        ['A', 'B', 'C'],
        ['A', 'B'],
        ['B', 'C'],
        [1, 2]
    )
    constrainedNodeId = 'someNodeId'
  })

  it('renders without crashing', () => {
    const component = render(<ForceDirectedGraph graph={graph} constrainedNodeId={constrainedNodeId} />)
    expect(component).toBeTruthy()
  })

})
