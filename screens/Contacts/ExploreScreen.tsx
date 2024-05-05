import React, { useEffect, useState } from "react"
import { View } from "react-native"
import { styles } from "./styles"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import SectionTabs from "../../components/SectionTabs/SectionTabs"
import { NavigationProp, ParamListBase } from "@react-navigation/native"
import ContactList from "./ContactList/ContactList"
import ContactGraph from "./ContactGraph/ContactGraph"
import { mockContacts } from "./mockContacts"
import Graph from "../../components/Graph/Graph"
import { Contact } from "../../types/Contact"
import AsyncStorage from "@react-native-async-storage/async-storage"

const GRAPH_STORAGE_KEY = "graph"
const GRAPH_EXISTENCE_FLAG_KEY = "graph_exists"

interface ContactListScreenProps {
  navigation: NavigationProp<ParamListBase>
}

const ExploreScreen = ({ navigation }: ContactListScreenProps) => {
  const [graph, setGraph] = useState<Graph>()

  useEffect(() => {
    const loadGraphData = async () => {
      try {
        // Check if the graph data exists in AsyncStorage
        const graphData = await AsyncStorage.getItem(GRAPH_STORAGE_KEY)
        if (graphData) {
          // If the data exists, parse it and set the graph state
          const parsedGraph = JSON.parse(graphData)
          setGraph(parsedGraph)
        } else {
          // If the data doesn't exist, create the graph from contacts
          const newGraph = createGraphfromContacts(mockContacts, "0")
          // Store the graph data in AsyncStorage
          await AsyncStorage.setItem(
            GRAPH_STORAGE_KEY,
            JSON.stringify(newGraph)
          )

          await AsyncStorage.setItem(GRAPH_EXISTENCE_FLAG_KEY, "true")
          // Set the graph state
          setGraph(newGraph)
        }
      } catch (error) {
        console.error("Error loading graph data:", error)
      }
    }

    // Load graph data when the component mounts
    loadGraphData()
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
          onContactPress={(/*uid*/) =>
            // This is hardcoded for now but will be just the uid when we'll have implemented friends
            navigation.navigate("ExternalProfile", { uid: "27tGkyeWaKYE46AyR8UMKwxLspH3" })
          }
          contacts={contacts}
        />
      )}

      {selectedTab === "Graph View" && graph && (
        <ContactGraph
          onContactPress={(/*uid*/) =>
            // This is hardcoded for now but will be just the uid when we'll have implemented friends
            navigation.navigate("ExternalProfile", { uid: "27tGkyeWaKYE46AyR8UMKwxLspH3" })
          }
          graph={graph}
          userId="0"
        />
      )}
    </View>
  )
}

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

export default ExploreScreen

export { destroyGraphFileIfExists }
