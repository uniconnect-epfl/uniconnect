import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View} from 'react-native';
import React from 'react';
import Graph from './graph/Graph';
import ForceDirectedGraph from './graph/Force-Directed-Graph/ForceDirectedGraph';



export default function App() {

  const graph = new Graph(['0', '1', '2', '3', '4', '5', '6'], ['0', '2', '3', '3', '3', '4', '5', '6', '6', '6'], ['1', '1', '1', '2', '0', '1', '1', '1', '2', '0'], [0.5, 0.2, 0.2, 0.5, 0.5, 0.5, 0.2, 0.5, 0.5, 0.5]);
  return (
    <View style={styles.container}>
      <ForceDirectedGraph graph={graph} constrainedNodeId='1'/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});

