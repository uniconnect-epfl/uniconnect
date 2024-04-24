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
import { StatusBar } from 'expo-status-bar'
import * as WebBrowser from "expo-web-browser"

SplashScreen.preventAutoHideAsync()

WebBrowser.maybeCompleteAuthSession()

export default function App() {
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
      <NavigationContainer>
        <SafeAreaProvider>
          <MainStackNavigator/>
        </SafeAreaProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  )
}
