import React from "react"
import { useEffect, useState } from "react"
import { View, TouchableWithoutFeedback, Keyboard, Image } from "react-native"
import { styles } from "./styles"
import Graph, {
  addContactNode,
  deleteNode,
  getNodeById,
  Node,
} from "../../../components/Graph/Graph"
import ForceDirectedGraph, {
  SimulationParameters,
} from "../../../components/Graph/ForceDirectedGraph/ForceDirectedGraph"
import NodeModal from "../../../components/Graph/NodeModal/NodeModal"
import { Contact } from "../../../types/Contact"
import { getUserData } from "../../../firebase/User"
import InputField from "../../../components/InputField/InputField"
import { Ionicons } from "@expo/vector-icons"
import { peach } from "../../../assets/colors/colors"
import GraphOptionsModal from "../../../components/Graph/GraphOptionsModal/GraphOptionsModal"
import { showErrorToast } from "../../../components/ToastMessage/toast"

import * as ScreenOrientation from "expo-screen-orientation"

const DEFAULT_SIMULATION_DISTANCE = 100
const DEFAULT_SIMULATION_CHARGE = -200
const DEFAULT_SIMULATION_COLLIDE = 20

const ICON_SIZE = 24

const LOADING_ANIMATION_DURATION = 2000

// To introduce randomness in the selection of relevant friends of friends, we introduce a selectivity factor
const FRIENDS_SELECTIVITY_FACTOR = 0.25

interface ContactGraphProps {
  onContactPress: (uid: string) => void
  graph: Graph
  userId: string
  userContact: Contact
  loaded: boolean
  navChange?: boolean
  changeTab?: () => void
  fullScreenCallback?: () => void
}

const ContactGraph = ({
  onContactPress,
  graph,
  userId,
  userContact,
  loaded,
  navChange,
  changeTab,
  fullScreenCallback,
}: ContactGraphProps) => {
  // Logic behing the loading screen

  const [display, setDisplay] = useState(false)

  useEffect(() => {
    if (loaded) {
      setCounter((prev) => prev + 1)
      setTimeout(() => {
        setDisplay(true)
      }, LOADING_ANIMATION_DURATION)
    } else {
      setDisplay(loaded)
    }
  }, [loaded])

  // Logic behind the full screen
  const [fullScreen, setFullScreen] = useState<boolean | null>(null)

  useEffect(() => {
    if (fullScreen != null && fullScreenCallback) {
      fullScreenCallback()
    }
  }, [fullScreen])

  // Logic behind the landscape mode
  const [rotation, setRotation] = useState(false)

  useEffect(() => {
    if (fullScreen) {
      const unlockOrientation = async () => {
        await ScreenOrientation.unlockAsync()
      }

      unlockOrientation()

      const handleOrientationChange = () => {
        // Ensure these functions are called first
        onModalPressOut()
        onOptionModalPressOut()

        // Then change the state to trigger the rotation
        setRotation((prev) => !prev)
      }

      const subscription = ScreenOrientation.addOrientationChangeListener(
        handleOrientationChange
      )

      return () => {
        const lockOrientation = async () => {
          await ScreenOrientation.lockAsync(
            ScreenOrientation.OrientationLock.PORTRAIT_UP
          )
        }

        lockOrientation()
        ScreenOrientation.removeOrientationChangeListener(subscription)
      }
    }
  }, [fullScreen])

  // Logic behind the search bar
  const [searchText, setSearchText] = useState("")

  // Force the graph component to re-render
  const [counter, setCounter] = useState(0)

  // Basic logic behind any interaction with the graph
  const [clickedNode, setClickedNode] = useState<Node>(
    getNodeById(graph, userId)
  )

  // Logic behind changing the graph simulation's parameters on the fly

  const [graphOptionsModalVisible, setGraphOptionsModalVisible] =
    useState<boolean>(false)

  const onOptionModalPress = async () => {
    await ScreenOrientation.getOrientationAsync().then((orientation) => {
      if (orientation === ScreenOrientation.Orientation.PORTRAIT_UP) {
        setGraphOptionsModalVisible(true)
      } else {
        showErrorToast(
          "Please rotate your device to portrait mode to view graph options"
        )
      }
    })
  }

  const onOptionModalPressOut = () => {
    setGraphOptionsModalVisible(false)
  }

  const [simulationParameters, setSimulationParameters] =
    useState<SimulationParameters>({
      distance: DEFAULT_SIMULATION_DISTANCE,
      charge: DEFAULT_SIMULATION_CHARGE,
      collide: DEFAULT_SIMULATION_COLLIDE,
    })

  const updateSimulationParameters = (param: SimulationParameters) => {
    setSimulationParameters(param)
  }

  // Logic behing the modal displaying the user's details
  const [modalVisible, setModalVisible] = useState(false)

  const onModalPress = async (uid: string) => {
    await ScreenOrientation.getOrientationAsync().then((orientation) => {
      if (orientation === ScreenOrientation.Orientation.PORTRAIT_UP) {
        const node = getNodeById(graph, uid)
        if (node) {
          setClickedNode(node)
          setModalVisible(true)
        }
      } else {
        showErrorToast(
          "Please rotate your device to portrait mode to view user details"
        )
      }
    })
  }

  const onModalPressOut = () => {
    setModalVisible(false)
  }

  // Logic behing the display of friends of friends
  const [magicPressedID, setMagicPressedID] = useState<string>("")
  const [magicNeighbors, setMagicNeighbors] = useState<string[]>([])

  const onMagicPress = async (uid: string) => {
    await ScreenOrientation.getOrientationAsync().then(async (orientation) => {
      if (orientation === ScreenOrientation.Orientation.PORTRAIT_UP) {
        if (uid === userId) {
          if (magicPressedID !== "") {
            getNodeById(graph, magicPressedID).magicSelected = false
          }
          setMagicPressedID("")
          magicNeighbors.forEach((neighbor) => {
            deleteNode(graph, neighbor)
          })
          setMagicNeighbors([])
        } else if (magicPressedID !== "" && magicPressedID === uid) {
          getNodeById(graph, uid).magicSelected = false
          setMagicPressedID("")
          magicNeighbors.forEach((neighbor) => {
            deleteNode(graph, neighbor)
          })
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
              !graph.nodes.find((node) => node.contact.uid === contact.uid) &&
              contact.uid !== userId &&
              getNodeById(graph, uid).contact.friends?.includes(contact.uid)
          )
          const relevantNewContact = filteredNewContacts.filter((contact) =>
            relevantContact(userContact, contact)
          )
          relevantNewContact.forEach((contact) => {
            addContactNode(graph, contact, 3)
          })
          setMagicNeighbors(relevantNewContact.map((contact) => contact.uid))
          getNodeById(graph, uid).magicSelected = true
          setMagicPressedID(uid)
        }

        setCounter((prev) => prev + 1)
        handleSearch(searchText, graph)
      } else {
        showErrorToast(
          "Please rotate your device to portrait mode to view friends of friends"
        )
      }
    })
  }

  useEffect(() => {
    if (navChange && changeTab !== undefined) {
      magicNeighbors.forEach((neighbor) => {
        if (!userContact.friends?.includes(neighbor)) {
          deleteNode(graph, neighbor)
        }
      })
      setMagicNeighbors([])
      setMagicPressedID("")
      changeTab()
    }
  }, [navChange])

  return (
    <TouchableWithoutFeedback
      onPress={() => Keyboard.dismiss()}
      testID="touchable"
    >
      <View style={styles.container}>
        {!fullScreen && (
          <InputField
            placeholder="Search..."
            value={searchText}
            onChangeText={(text) => {
              setSearchText(text)
              handleSearch(text, graph)
            }}
            onSubmitEditing={() => handleQuery(onContactPress, graph)}
          />
        )}
        <NodeModal
          node={clickedNode}
          visible={modalVisible}
          onPressOut={onModalPressOut}
          onContactPress={onContactPress}
        />
        <GraphOptionsModal
          visible={graphOptionsModalVisible}
          onPressOut={onOptionModalPressOut}
          updateSimulationParameters={updateSimulationParameters}
          initialParameters={simulationParameters}
        />
        <View
          style={
            fullScreen ? styles.graphContainerFullScreen : styles.graphContainer
          }
        >
          {!display && <Image source={require("../../../assets/splash.gif")} />}
          {userContact.friends?.length === 0 && display && (
            <Image
              source={require("../../../assets/nofriendsscreen.png")}
              style={styles.nofriends}
            />
          )}

          {userContact.friends?.length !== 0 && fullScreen && display && (
            <Ionicons
              name="contract-outline"
              size={ICON_SIZE}
              color={peach}
              style={styles.contractIcon}
              onPress={() => {
                setFullScreen(false)
              }}
              testID="contract-button"
            />
          )}
          {userContact.friends?.length !== 0 && !fullScreen && display && (
            <Ionicons
              name="expand-outline"
              size={ICON_SIZE}
              color={peach}
              style={styles.expandIcon}
              onPress={() => {
                setFullScreen(true)
              }}
              testID="expand-button"
            />
          )}

          {userContact.friends?.length !== 0 && display && (
            <Ionicons
              name="options-outline"
              size={ICON_SIZE}
              color={peach}
              style={[
                styles.simulationOptionIcon,
                // eslint-disable-next-line react-native/no-inline-styles
                {
                  bottom: fullScreen ? 50 : 15,
                  right: fullScreen ? 20 : 15,
                },
              ]}
              onPress={onOptionModalPress}
              testID="options-button"
            />
          )}
          {userContact.friends?.length !== 0 && graph && (
            <ForceDirectedGraph
              key={counter}
              graph={graph}
              constrainedNodeId={userId}
              magicNodeId={magicPressedID}
              onModalPress={onModalPress}
              onMagicPress={onMagicPress}
              rotation={rotation}
              simulationParameters={simulationParameters}
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
    for (const node of graph.nodes) {
      node.selected = false
    }
  } else {
    // If the search bar is not empty, select the nodes that match the search text
    for (const node of graph.nodes) {
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
  for (const node of graph.nodes) {
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
        uid: friendID,
        firstName: friend?.firstName ?? "",
        lastName: friend?.lastName ?? "",
        profilePictureUrl: friend?.profilePicture ?? "",
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
  const user = await getUserData(uid)
  if (!user) {
    return []
  } else {
    return user.friends ?? []
  }
}

export function createGraphfromContacts(
  contacts: Contact[],
  uid: string | undefined
): Graph {
  return new Graph(contacts, uid ?? "-1")
}

function relevantContact(a: Contact, b: Contact): boolean {
  const interests = a.interests.filter((value) => b.interests.includes(value))
  const events = a.events.filter((value) => b.events.includes(value))

  if (
    !(interests.length + events.length) ||
    Math.random() < FRIENDS_SELECTIVITY_FACTOR
  )
    return false

  return true
}
