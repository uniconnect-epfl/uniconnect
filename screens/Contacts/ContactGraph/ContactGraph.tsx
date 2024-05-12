import React, { useState } from "react"

import {
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native"

import { styles } from "./styles"

import Graph, {
  addContactNode,
  deleteNode,
  getNodeById,
  getNodes,
  Node,
  setInitialized,
} from "../../../components/Graph/Graph"

import ForceDirectedGraph from "../../../components/Graph/ForceDirectedGraph/ForceDirectedGraph"

import NodeModal from "../../../components/Graph/NodeModal/NodeModal"

import { Contact } from "../../../types/Contact"
import { getUserData } from "../../../firebase/User"

interface ContactGraphProps {
  onContactPress: (uid: string) => void
  graph: Graph
  userId: string
  userContact: Contact
}

const ContactGraph = ({
  onContactPress,
  graph,
  userId,
  userContact,
}: ContactGraphProps) => {
  const [searchText, setSearchText] = useState("")
  const [modalVisible, setModalVisible] = useState(false)
  const [clickedNode, setClickedNode] = useState<Node>(
    getNodeById(graph, userId)
  )
  const [counter, setCounter] = useState(1)

  const updateCounter = () => {
    setCounter((prevCounter) => prevCounter + 1)
  }

  const [magicNeighbors, setMagicNeighbors] = useState<string[]>([])

  const [magicPressedID, setMagicPressedID] = useState<string>("")

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

  const onMagicPress = async (uid: string) => {
    if (!graph) {
      return
    }
    if (uid === userId) {
      setInitialized(graph, false)
      if (magicPressedID !== "") {
        getNodeById(graph, magicPressedID).magicSelected = false
      }
      setMagicPressedID("")
      magicNeighbors.forEach((neighbor) => {
        deleteNode(graph, neighbor)
      })
      setMagicNeighbors([])
    } else if (magicPressedID !== "" && magicPressedID === uid) {
      setInitialized(graph, false)
      getNodeById(graph, uid).magicSelected = false
      setMagicPressedID("")
      magicNeighbors.forEach((neighbor) => {
        deleteNode(graph, neighbor)
      })
      setMagicNeighbors([])
    } else {
      if (magicPressedID !== "" && magicPressedID !== uid) {
        getNodeById(graph, magicPressedID).magicSelected = false
        magicNeighbors.forEach((neighbor) => {
          deleteNode(graph, neighbor)
        })
      }
      const newFriends = await friendsFromUID(uid)

      const newContacts = await createContactListFromUsers(newFriends)

      const filteredNewContacts = newContacts.filter(
        (contact) =>
          !getNodes(graph).find((node) => node.contact.uid === contact.uid) &&
          contact.uid !== userId &&
          getNodeById(graph, uid).contact.friends?.includes(contact.uid)
      )

      const relevantNewContact = filteredNewContacts.filter((contact) =>
        relevantContact(userContact, contact)
      )

      if (relevantNewContact.length === 0) {
        setInitialized(graph, false)
      }

      relevantNewContact.forEach((contact) => {
        addContactNode(graph, contact, 3)
      })

      setMagicNeighbors(relevantNewContact.map((contact) => contact.uid))
      getNodeById(graph, uid).magicSelected = true
      setMagicPressedID(uid)
      setInitialized(graph, false)
    }
    handleSearch(searchText, graph)
  }

  return (
    // Dismiss the keyboard when the user taps outside of the search bar
    <TouchableWithoutFeedback
      onPress={() => Keyboard.dismiss()}
      testID="touchable"
    >
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
          {graph && counter && (
            <ForceDirectedGraph
              graph={graph}
              constrainedNodeId={userId}
              magicNodeId={magicPressedID}
              modalPressedOut={!modalVisible}
              onModalPress={onModalPress}
              onMagicPress={onMagicPress}
              reload={updateCounter}
            />
          )}
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

export async function createContactListFromUsers(
  friends: string[]
): Promise<Contact[]> {
  const promises: Promise<Contact>[] = friends.map(async (friendID) => {
    if (friendID) {
      const friend = await getUserData(friendID)
      const contact: Contact = {
        uid: friend?.uid ?? "-1",
        firstName: friend?.firstName ?? "",
        lastName: friend?.lastName ?? "",
        profilePictureUrl: "",
        // "https://t3.ftcdn.net/jpg/04/65/28/08/360_F_465280897_8nL6xlvBwUcLYIQBmyX0GO9fQjDwNYtV.jpg",
        description: friend?.description ?? "",
        location: friend?.location ?? "",
        interests: friend?.selectedInterests ?? [""],
        events: [""],
        friends: friend?.friends ?? [],
      }
      return contact
    }
    // Return a default Contact object if friend is undefined
    return {
      uid: "-1",
      firstName: "",
      lastName: "",
      profilePictureUrl: "",
      description: "",
      location: "",
      interests: [""],
      events: [""],
      friends: [],
    }
  })

  return Promise.all(promises)
}

export async function friendsFromUID(uid: string): Promise<string[]> {
  // TODO: Implement Asynchronous storage of friends data
  const user = await getUserData(uid)
  if (!user) {
    return []
  } else {
    return user.friends ?? []
  }
}

export function createGraphfromContacts(
  contacts: Contact[],
  uid: string
): Graph {
  return new Graph(contacts, uid)
}

function relevantContact(a: Contact, b: Contact): boolean {
  const interests = a.interests.filter((value) => b.interests.includes(value))
  const events = a.events.filter((value) => b.events.includes(value))

  if (!(interests.length + events.length) || Math.random() < 0.5) return false

  return true
}
