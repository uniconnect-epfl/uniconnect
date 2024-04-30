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
import { destroyGraphFileIfExists } from "./screens/Contacts/ExploreScreen"

// Call the function to destroy the graph file when the app launches
destroyGraphFileIfExists()

import Toast from "react-native-toast-message"

SplashScreen.preventAutoHideAsync()

WebBrowser.maybeCompleteAuthSession()

export default function App() {
  const linking = {
    prefixes: [Linking.createURL("/")],
    config: {
      screens: {
        AddContact: "uniconnect/contact/:uid",
        ViewEvent: "event/:uid"
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
        <Toast />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}
