import React, { useEffect, useState } from "react"
import { View } from "react-native"
import { styles } from "./styles"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import SectionTabs from "../../components/SectionTabs/SectionTabs"
import { NavigationProp, ParamListBase } from "@react-navigation/native"
import ContactList from "./ContactList/ContactList"
import ContactGraph, {
  createContactListFromUsers,
  createGraphfromContacts,
} from "./ContactGraph/ContactGraph"
import Graph from "../../components/Graph/Graph"
import { Contact } from "../../types/Contact"
import AsyncStorage from "@react-native-async-storage/async-storage"

import { User } from "../../types/User"
import { getUserData } from "../../firebase/User"
import { getAuth } from "firebase/auth"

const GRAPH_STORAGE_KEY = "graph"
const GRAPH_EXISTENCE_FLAG_KEY = "graph_exists"

interface ContactListScreenProps {
  navigation: NavigationProp<ParamListBase>
}

const ExploreScreen = ({ navigation }: ContactListScreenProps) => {
  const [graph, setGraph] = useState<Graph>()

  const [user, setUser] = useState<User | null>(null)
  const [userId, setUserId] = useState<string | undefined>(undefined)

  const [userContact, setUserContact] = useState<Contact>({
    uid: "-1",
    firstName: "",
    lastName: "",
    profilePictureUrl: "",
    description: "",
    location: "",
    interests: [""],
    events: [""],
    friends: [""],
  })

  const [friends, setFriends] = useState<string[] | null>(null)
  const [contacts, setContacts] = useState<Contact[]>([])

  const initializeContacts = async () => {
    const contacts = await createContactListFromUsers(friends ?? [])
    setContacts(contacts)
  }
  useEffect(() => {
    if (friends) {
      initializeContacts()
    }
  }, [friends])

  useEffect(() => {
    console.log(contacts)
    if (contacts.length > 0) {
      loadGraphData(userId ?? "-1", userContact, contacts).then((graph) => {
        setGraph(graph)
      })
    }
  }, [contacts])

  useEffect(() => {
    setUserId(getAuth().currentUser?.uid)
  }, [navigation])

  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        setUser(await getUserData(userId))
      }
    }
    fetchData()
  }, [userId])

  useEffect(() => {
    if (user) {
      const contact: Contact = {
        uid: user?.uid ?? "-1",
        firstName: user?.firstName ?? "",
        lastName: user?.lastName ?? "",
        profilePictureUrl:
          "https://t3.ftcdn.net/jpg/04/65/28/08/360_F_465280897_8nL6xlvBwUcLYIQBmyX0GO9fQjDwNYtV.jpg",
        description: user?.description ?? "",
        location: user?.location ?? "",
        interests: user?.selectedInterests ?? [""],
        events: [""],
        friends: user?.friends ?? [],
      }
      setUserContact(contact)
    }
    if (user?.friends) {
      setFriends(user?.friends)
    }
  }, [user])

  const [selectedTab, setSelectedTab] = useState("Plain View")
  const insets = useSafeAreaInsets()

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
            navigation.navigate("ExternalProfile", {
              externalUserUid: uid,
            })
          }
          contacts={contacts}
        />
      )}

      {selectedTab === "Graph View" && graph && userId && (
        <ContactGraph
          onContactPress={(uid) =>
            navigation.navigate("ExternalProfile", {
              externalUserUid: uid,
            })
          }
          graph={graph}
          userId={userId}
          userContact={userContact}
        />
      )}
    </View>
  )
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

async function loadGraphData(
  userId: string,
  userContact: Contact,
  contacts: Contact[]
): Promise<Graph> {
  try {
    const graphData = await AsyncStorage.getItem(GRAPH_STORAGE_KEY)
    if (graphData) {
      const parsedGraph = JSON.parse(graphData)
      return parsedGraph
    } else {
      const newGraph = createGraphfromContacts(
        [userContact, ...contacts],
        userId ?? "-1"
      )
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
