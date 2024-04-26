import {
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native"
import { styles } from "./styles"
import Graph, {
  getNodeById,
  getNodes,
  Node,
} from "../../../components/Graph/Graph"

import ForceDirectedGraph from "../../../components/Graph/ForceDirectedGraph/ForceDirectedGraph"
import React, { useState } from "react"

import NodeModal from "../../../components/Graph/NodeModal/NodeModal"
interface ContactGraphProps {
  onContactPress: (uid: string) => void
  graph: Graph
  userId: string
}

const ContactGraph = ({ onContactPress, graph, userId }: ContactGraphProps) => {
  const [searchText, setSearchText] = useState("")

  const [clickedNode, setClickedNode] = useState<Node>(
    getNodeById(graph, userId)
  )

  const [modalVisible, setModalVisible] = useState(false)

  const onModalPress = (uid: string) => {
    const node = getNodeById(graph, uid)
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
          }}
          onSubmitEditing={() => handleQuery(onContactPress, graph)}
        />

        <NodeModal
          node={clickedNode}
          visible={modalVisible}
          onPressOut={onPressOut}
          onContactPress={onContactPress}
        />
        <View style={styles.graphContainer}>
          <ForceDirectedGraph
            graph={graph}
            constrainedNodeId={userId}
            onModalPress={onModalPress}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default ContactGraph

function handleSearch(text: string, graph: Graph): void {
  if (text === "") {
    for (const node of getNodes(graph)) {
      node.selected = false
    }
  } else {
    for (const node of getNodes(graph)) {
      const fullname = `${node.contact.firstName} ${node.contact.lastName}`
      if (
        fullname.toLowerCase().includes(text.toLowerCase()) ||
        text.toLocaleLowerCase().includes(fullname.toLowerCase())
      ) {
        node.selected = true
      } else {
        node.selected = false
      }
    }
  }
}

function handleQuery(callback: (uid: string) => void, graph: Graph): void {
  for (const node of getNodes(graph)) {
    if (node.selected) {
      callback(node.id)
      return
    }
  }
}
