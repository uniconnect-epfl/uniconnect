import React, { useEffect, useState } from "react"
import { View } from "react-native"
import { styles } from "./styles"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import SectionTabs from "../../components/SectionTabs/SectionTabs"
import { NavigationProp, ParamListBase } from "@react-navigation/native"
import ContactList from "./ContactList/ContactList"
import ContactGraph from "./ContactGraph/ContactGraph"
import { mockContacts } from "./mockContacts"
import { mockContactsL2 } from "./mockContactsL2"
import Graph, {
  addContactNode,
  addLink,
  deleteNode,
  getNodeById,
  setInitialized,
} from "../../components/Graph/Graph"
import { Contact } from "../../types/Contact"
import AsyncStorage from "@react-native-async-storage/async-storage"

// import { User } from "../../types/User"
// import { getUserData } from "../../firebase/User"
// import { getAuth } from "firebase/auth"
// import { get } from "http"

const GRAPH_STORAGE_KEY = "graph"
const GRAPH_EXISTENCE_FLAG_KEY = "graph_exists"

interface ContactListScreenProps {
  navigation: NavigationProp<ParamListBase>
}

const ExploreScreen = ({ navigation }: ContactListScreenProps) => {
  const [graph, setGraph] = useState<Graph>()
  const [magicNeighbors, setMagicNeighbors] = useState<string[]>([])

  const [magicPressedID, setMagicPressedID] = useState<string>("")

  // const [user, setUser] = useState<User | null>(null)
  // const [userId, setUserId] = useState<string | null>("0")

  const userId = "0"
  // const [friends, setFriends] = useState<string[] | null>(null)

  const onMagicPress = (uid: string) => {
    if (graph) {
      if (magicPressedID === uid) {
        setInitialized(graph, false)
        getNodeById(graph, uid).magicSelected = false
        setMagicPressedID("")
        magicNeighbors.forEach((neighbor) => {
          deleteNode(graph, neighbor)
        })
        setMagicNeighbors([])
      } else {
        // friendsFromUID(uid).then((friends) => {
        //   const newContacts = createContactListFromUsers(friends)
        //   newContacts.forEach((contact) => {
        //     addContactNode(graph, contact, 3)
        //     addLink(graph, uid, contact.uid)
        //   })
        // })

        const newContacts = mockContactsL2
        newContacts.forEach((contact) => {
          addContactNode(graph, contact, 3)
          addLink(graph, uid, contact.uid)
        })
        setMagicNeighbors(newContacts.map((contact) => contact.uid))
        getNodeById(graph, uid).magicSelected = true
        setMagicPressedID(uid)
        setInitialized(graph, false)
      }
    }
  }

  // useEffect(() => {
  //   console.log("User ID: ", userId)
  //   const fetchData = async () => {
  //     if (userId) {
  //       setUser(await getUserData(userId))
  //     }
  //   }
  //   fetchData()
  //   // if (user?.friends) {
  //   //   setFriends(user?.friends)
  //   // }
  // }, [userId])

  useEffect(() => {
    loadGraphData().then((graph) => {
      setGraph(graph)
    })
  }, [])

  const [selectedTab, setSelectedTab] = useState("Plain View")
  const insets = useSafeAreaInsets()

  // TODO: Implement retrieval and creation of list of contacts

  const contacts = mockContacts

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <SectionTabs
        tabs={["Plain View", "Graph View"]}
        startingTab="Plain View"
        onTabChange={(tab) => {
          setSelectedTab(tab)
        }}
      />

      <View style={styles.separationBar} />

      {selectedTab === "Plain View" && (
        <ContactList
          onContactPress={(uid) =>
            navigation.navigate("ExternalProfile", { uid: uid })
          }
          contacts={contacts}
        />
      )}

      {selectedTab === "Graph View" && graph && userId && (
        <ContactGraph
          onContactPress={(uid) =>
            navigation.navigate("ExternalProfile", { uid: uid })
          }
          graph={graph}
          userId={userId}
          magicUserId={magicPressedID}
          onMagicPress={onMagicPress}
        />
      )}
    </View>
  )
}

// async function friendsFromUID(uid: string): Promise<string[]> {
//   const user = await getUserData(uid)
//   if (!user) {
//     return []
//   } else {
//     return user.friends ?? []
//   }
// }

// function createContactListFromUsers(friends: string[]): Contact[] {
//   const contacts: Contact[] = []
//   friends.forEach((friendID) => {
//     const fetchData = async () => {
//       if (friendID) {
//         const friend = await getUserData(friendID)
//         const contact: Contact = {
//           uid: friend?.uid ?? "-1",
//           firstName: friend?.firstName ?? "",
//           lastName: friend?.lastName ?? "",
//           profilePictureUrl: "",
//           description: friend?.description ?? "",
//           location: friend?.location ?? "",
//           interests: friend?.selectedInterests ?? [""],
//           events: [""],
//           friends: friend?.friends ?? [],
//         }
//         contacts.push(contact)
//       }
//     }
//     fetchData()
//   })

//   return contacts
// }
function createGraphfromContacts(contacts: Contact[], uid: string): Graph {
  return new Graph(contacts, uid)
}

// Function to destroy the graph file if it exists
const destroyGraphFileIfExists = async () => {
  try {
    // Check if the graph file exists
    const graphExists = await AsyncStorage.getItem(GRAPH_EXISTENCE_FLAG_KEY)
    if (graphExists === "true") {
      // If the graph file exists, delete it
      await AsyncStorage.removeItem(GRAPH_STORAGE_KEY)
      // Reset the flag to indicate that the graph file no longer exists
      await AsyncStorage.setItem(GRAPH_EXISTENCE_FLAG_KEY, "false")
    }
  } catch (error) {
    console.error("Error destroying graph file:", error)
  }
}

async function loadGraphData(): Promise<Graph> {
  console.log("Loading graph data")
  try {
    const graphData = await AsyncStorage.getItem(GRAPH_STORAGE_KEY)
    if (graphData) {
      const parsedGraph = JSON.parse(graphData)
      return parsedGraph
    } else {
      const newGraph = createGraphfromContacts(mockContacts, "0")
      // const newGraph = createGraphfromContacts(
      //   createContactListFromUsers(friends ?? []),
      //   userId ?? "-1"
      // )
      await AsyncStorage.setItem(GRAPH_STORAGE_KEY, JSON.stringify(newGraph))

      await AsyncStorage.setItem(GRAPH_EXISTENCE_FLAG_KEY, "true")
      return newGraph
    }
  } catch (error) {
    console.error("Error loading graph data:", error)
    return new Graph([], "")
  }
}

export default ExploreScreen

export { destroyGraphFileIfExists }
