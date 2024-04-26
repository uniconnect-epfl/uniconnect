import { NavigationContainer } from "@react-navigation/native"
import React, { useEffect } from "react"
import * as SplashScreen from "expo-splash-screen"
import MainStackNavigator from "./navigation/Main/MainStackNavigator"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import styles from "./styles"
import {
  useFonts,
  JetBrainsMono_100Thin_Italic,
  JetBrainsMono_400Regular,
  JetBrainsMono_700Bold,
} from "@expo-google-fonts/jetbrains-mono"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { StatusBar } from "expo-status-bar"
import * as WebBrowser from "expo-web-browser"
import * as Linking from "expo-linking"
// import HomeScreen from "./screens/Home/HomeScreen"

import AsyncStorage from "@react-native-async-storage/async-storage"

const GRAPH_STORAGE_KEY = "graph"
const GRAPH_EXISTENCE_FLAG_KEY = "graph_exists"

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

// Call the function to destroy the graph file when the app launches
destroyGraphFileIfExists()

SplashScreen.preventAutoHideAsync()

WebBrowser.maybeCompleteAuthSession()

export default function App() {
  const linking = {
    prefixes: [Linking.createURL("/")],
    config: {
      screens: {
        AddContact: "uniconnect/contact/:uid",
      },
    },
  }

  const [fontsLoaded] = useFonts({
    JetBrainsMono_100Thin_Italic,
    JetBrainsMono_400Regular,
    JetBrainsMono_700Bold,
  })

  useEffect(() => {
    async function hideSplashScreen() {
      if (fontsLoaded) {
        await SplashScreen.hideAsync()
      }
    }
    hideSplashScreen()
  }, [fontsLoaded])

  if (!fontsLoaded) {
    return null
  }
  return (
    <GestureHandlerRootView style={styles.gestureHandler}>
      <StatusBar style="dark" />
      <SafeAreaProvider>
        <NavigationContainer linking={linking}>
          <MainStackNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}
