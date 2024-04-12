import React from 'react';
import Graph from '../Graph';
import ForceDirectedGraph from './ForceDirectedGraph';

const ExampleForceDirectedGraph = () => {
    const graph = new Graph(['0', '1', '2', '3', '4', '5', '6'], ['0', '2', '3', '3', '3', '4', '5', '6', '6', '6'], ['1', '1', '1', '2', '0', '1', '1', '1', '2', '0'], [0.5, 0.2, 0.2, 0.5, 0.5, 0.5, 0.2, 0.5, 0.5, 0.5]);
    const constrainedNodeId = '1';
    return (
        <ForceDirectedGraph graph={graph} constrainedNodeId={constrainedNodeId}/>
    );
}

export default ExampleForceDirectedGraph;