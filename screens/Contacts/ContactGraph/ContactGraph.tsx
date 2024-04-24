import { View, TextInput, TouchableWithoutFeedback, Keyboard } from "react-native"
import { styles } from "./styles"
import Graph from "../../../components/Graph/Graph"

import ForceDirectedGraph from "../../../components/Graph/ForceDirectedGraph/ForceDirectedGraph"
import { useState } from "react"


const graph = new Graph(
  ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
  ["0", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
  ["1", "1", "1", "1", "1", "1", "2", "2", "3", "3"],
  [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5]
)
const constrainedNodeId = "1"

interface ContactGraphProps{
  onContactPress: (uid : string) => void
}

const ContactGraph = ({onContactPress} : ContactGraphProps) => {

  const [searchText, setSearchText] = useState("")

  return (
    
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search..."
        value={searchText}
        onChangeText={(text) => {
          setSearchText(text)
          handleSearch(text, graph)
         }
        }
        onSubmitEditing={() => handleQuery(onContactPress)}
      />
    <View style={styles.graphContainer}>
    <ForceDirectedGraph graph={graph} constrainedNodeId={constrainedNodeId} onContactPress={onContactPress} />
    </View>
    </View>
    </TouchableWithoutFeedback>
  )
}

export default ContactGraph

function handleSearch(text: string, graph: Graph): void {
  // TODO: Implement regex search for tags and names and update the graph accordingly
  if (text === "") {
    const nodes = graph.getNodes()
    for (const node of nodes) {
      node.selected = false
    }
    return
  }
  const nodes = graph.getNodes()
  for (const node of nodes) {
    if (node.id.includes(text)) {
      node.selected = true
    }
    else {
      node.selected = false
    }
  }
}

function handleQuery(callback: (uid: string) => void): void {
  for (const node of graph.getNodes()) {
    if (node.selected) {
      callback(node.id)
      return
    }
  }
}