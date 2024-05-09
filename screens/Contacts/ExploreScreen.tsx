import React, { useEffect, useState } from "react"
import { View } from "react-native"
import { styles } from "./styles"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import SectionTabs from "../../components/SectionTabs/SectionTabs"
import { NavigationProp, ParamListBase } from "@react-navigation/native"
import ContactList from "./ContactList/ContactList"
import ContactGraph from "./ContactGraph/ContactGraph"
import { mockContacts } from "./mockContacts"
import Graph, {
  addContactNode,
  deleteNode,
  getNodeById,
  getNodes,
  setInitialized,
} from "../../components/Graph/Graph"
import { Contact } from "../../types/Contact"
import AsyncStorage from "@react-native-async-storage/async-storage"

// import { User } from "../../types/User"
// import { getUserData } from "../../firebase/User"
// import { getAuth } from "firebase/auth"

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
  // const [userId, setUserId] = useState<string | undefined>("0")
  // const [friends, setFriends] = useState<string[] | null>(null)

  const userId = "0"

  const onMagicPress = (uid: string) => {
    if (graph) {
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
          setMagicNeighbors([])
        }
        // const newFriends = friendsFromUID(uid)
        //
        // newFriends.then((friends) => {
        //   const newContacts = createContactListFromUsers(friends)
        //   const filteredNewContacts = newContacts.filter(
        //     (contact) =>
        //     !getNodes(graph).find((node) => node.contact.uid === contact.uid) &&
        //     contact.uid !== userId &&
        //     getNodeById(graph, uid).contact.friends?.includes(contact.uid)
        // )

        //   filteredNewContacts.forEach((contact) => {
        //     addContactNode(graph, contact, 3)
        //   })
        // })
        //
        // setMagicNeighbors(filteredNewContacts.map((contact) => contact.uid))
        //
        // getNodeById(graph, uid).magicSelected = true
        // setMagicPressedID(uid)
        // setInitialized(graph, false)

        const newContacts = mockContacts
        const filteredNewContacts = newContacts.filter(
          (contact) =>
            !getNodes(graph).find((node) => node.contact.uid === contact.uid) &&
            contact.uid !== userId &&
            getNodeById(graph, uid).contact.friends?.includes(contact.uid)
        )
        filteredNewContacts.forEach((contact) => {
          addContactNode(graph, contact, 3)
        })
        setMagicNeighbors(filteredNewContacts.map((contact) => contact.uid))

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

  // useEffect(() => {
  //   setUserId(getAuth().currentUser?.uid)
  // }
  // , [navigation])

  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (userId) {
  //       setUser(await getUserData(userId))
  //     }
  //   }
  //   fetchData()
  // }, [userId])

  // useEffect(() => {
  //   if (user?.friends) {
  //     setFriends(user?.friends)
  //   }
  // }, [user])

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
          onContactPress={
            (/*uid*/) =>
              // This is hardcoded for now but will be just the uid when we'll have implemented friends
              navigation.navigate("ExternalProfile", {
                externalUserUid: "5AsCcApHTEdn2YW7IB8DOClVTZw1",
              })
          }
          contacts={contacts}
        />
      )}

      {selectedTab === "Graph View" && graph && userId && (
        <ContactGraph
          onContactPress={
            (/*uid*/) =>
              // This is hardcoded for now but will be just the uid when we'll have implemented friends
              navigation.navigate("ExternalProfile", {
                externalUserUid: "5AsCcApHTEdn2YW7IB8DOClVTZw1",
              })
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

// TODO: Implement the 'similarity' fetching
// async function friendsFromUID(uid: string): Promise<string[]> {
//   TODO: Implement Asynchronous storage of friends data
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
//   TODO: Check for the existence of this friend in Asynchronous storage to avoid fetching again and again
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
  try {
    const graphData = await AsyncStorage.getItem(GRAPH_STORAGE_KEY)
    if (graphData) {
      const parsedGraph = JSON.parse(graphData)
      return parsedGraph
    } else {
      const newGraph = createGraphfromContacts(mockContacts, "0")

      // Create the graph by fetching the user's friends
      // –––––––––––––––––––––––––––––––––––––––––––––––

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
