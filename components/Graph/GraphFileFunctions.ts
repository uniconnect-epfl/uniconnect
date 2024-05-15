import AsyncStorage from "@react-native-async-storage/async-storage"
import { createGraphfromContacts } from "../../screens/Network/ContactGraph/ContactGraph"
import { Contact } from "../../types/Contact"
import Graph from "./Graph"

const GRAPH_STORAGE_KEY = "graph"
const GRAPH_EXISTENCE_FLAG_KEY = "graph_exists"

async function loadGraphData(
  userId: string | undefined,
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
        userId
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

export { loadGraphData, destroyGraphFileIfExists }
