import { View, TextInput, TouchableWithoutFeedback, Keyboard } from "react-native"
import { styles } from "./styles"
import Graph from "../../../components/Graph/Graph"

import ForceDirectedGraph from "../../../components/Graph/ForceDirectedGraph/ForceDirectedGraph"
import { useState } from "react"


const graph = new Graph(
  ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
  ["0", "2", "3", "4", "5", "6", "7", "8", "9"],
  ["1", "1", "1", "1", "1", "1", "2", "2", "3"],
  [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5]
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
  console.log(text)
  console.log(graph)
}