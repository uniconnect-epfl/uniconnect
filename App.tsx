import { NavigationContainer } from "@react-navigation/native"
import React, { useEffect, useState } from "react"
import * as SplashScreen from "expo-splash-screen"
import RegistrationStackNavigator from "./navigation/Registration/RegistrationStackNavigator"
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

export default function App() {
  const [fontsLoaded] = useFonts({
    JetBrainsMono_100Thin_Italic,
    JetBrainsMono_400Regular,
    JetBrainsMono_700Bold,
  })
  const [appIsReady, setAppIsReady] = useState(false)

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync()
        await new Promise((resolve) => setTimeout(resolve, 2000))
      } catch (e) {
        console.warn(e)
      } finally {
        setAppIsReady(true)
      }
    }

    prepare()
  }, [])

  useEffect(() => {
    async function hideSplashScreen() {
      if (fontsLoaded && appIsReady) {
        await SplashScreen.hideAsync()
      }
    }

    hideSplashScreen()
  }, [fontsLoaded, appIsReady])

  if (!fontsLoaded || !appIsReady) {
    return null
  }
  return (
    <GestureHandlerRootView style={styles.gestureHandler}>
      <StatusBar style="dark" />
      <NavigationContainer>
        <SafeAreaProvider>
          <RegistrationStackNavigator />
        </SafeAreaProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  )
}
