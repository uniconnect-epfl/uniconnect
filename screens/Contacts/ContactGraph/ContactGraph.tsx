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
  onMagicPress: (uid: string) => void
  graph: Graph
  userId: string
  magicUserId: string
}

const ContactGraph = ({
  onContactPress,
  graph,
  userId,
  magicUserId,
  onMagicPress,
}: ContactGraphProps) => {
  const [searchText, setSearchText] = useState("")
  const [modalVisible, setModalVisible] = useState(false)
  const [clickedNode, setClickedNode] = useState<Node>(
    getNodeById(graph, userId)
  )

  const onModalPress = (uid: string) => {
    const node = getNodeById(graph, uid)
    if (node) {
      setClickedNode(node)
      setModalVisible(true)
    }
  }

  const onModalPressOut = () => {
    setModalVisible(false)
  }

  const onMagicPressUpdate = (uid: string) => {
    onMagicPress(uid)
    handleSearch(searchText, graph)
  }

  return (
    // Dismiss the keyboard when the user taps outside of the search bar
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
          onPressOut={onModalPressOut}
          onContactPress={onContactPress}
        />
        <View style={styles.graphContainer}>
          <ForceDirectedGraph
            graph={graph}
            constrainedNodeId={userId}
            magicNodeId={magicUserId}
            modalPressedOut={!modalVisible}
            onModalPress={onModalPress}
            onMagicPress={onMagicPressUpdate}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default ContactGraph

/**
 * Function to handle the search input
 * @param text - The text in the search bar
 * @param graph - The graph to search
 */
function handleSearch(text: string, graph: Graph): void {
  if (text === "") {
    // If the search bar is empty, deselect all nodes
    for (const node of getNodes(graph)) {
      node.selected = false
    }
  } else {
    // If the search bar is not empty, select the nodes that match the search text
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

/**
 * Function to handle the query input from the search bar when submitted
 * @param callback - The function to call with the selected node's unique identifier
 * @param graph - The graph to query
 */
function handleQuery(callback: (uid: string) => void, graph: Graph): void {
  for (const node of getNodes(graph)) {
    if (node.selected) {
      callback(node.id)
      return
    }
  }
}
