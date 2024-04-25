import { View, TextInput, TouchableWithoutFeedback, Keyboard } from "react-native"
import { styles } from "./styles"
import Graph, { Node } from "../../../components/Graph/Graph"

import ForceDirectedGraph from "../../../components/Graph/ForceDirectedGraph/ForceDirectedGraph"
import { useState } from "react"

import NodeModal from "../../../components/Graph/NodeModal/NodeModal"

import { graph, constrainedNodeId } from "./mockGraph"
interface ContactGraphProps{
  onContactPress: (uid : string) => void
}

const ContactGraph = ({onContactPress} : ContactGraphProps) => {

  const [searchText, setSearchText] = useState("")

  const [clickedNode, setClickedNode] = useState<Node >(graph.getNodes()[0])

  const [modalVisible, setModalVisible] = useState(false)

  const onModalPress = (uid: string) => {
    const node = graph.getNodeById(uid)
    if (node) {
      setClickedNode(node)
      setModalVisible(true)
    }
  }

  const onPressOut = () => {
    setModalVisible(false)
  }
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
    
    <NodeModal node={clickedNode} visible={modalVisible} onPressOut={onPressOut} onContactPress={onContactPress} />
    <View style={styles.graphContainer}>

    <ForceDirectedGraph graph={graph} constrainedNodeId={constrainedNodeId} onModalPress={onModalPress} />
    </View>
    </View>
    </TouchableWithoutFeedback>
  )
}

export default ContactGraph

function handleSearch(text: string, graph: Graph): void {
  if (text === "") {
    for (const node of graph.getNodes()) {
      node.selected = false
    }
  }
  else {
    for (const node of graph.getNodes()) {
      if (node.id.includes(text) || text.includes(node.id)) {
        node.selected = true
      }
      else {
        node.selected = false
      }
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

