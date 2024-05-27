import * as React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import ExploreScreen from "../../screens/Explore/ExploreScreen"
import { TabBar } from "../../components/TabBar/TabBar"
import { Header } from "../../components/Header/Header"
import NetworkScreen from "../../screens/Network/NetworkScreen"
import QrScanScreen from "../../screens/QrScan/QrScanScreen"
import { createContext, useContext, useState } from "react"

const FullScreenContext = createContext({
  switchToFullScreen: () => {},
  switchFromFullScreen: () => {},
})

const Tab = createBottomTabNavigator()

const HomeTabNavigator = () => {
  const [isFullScreen, setIsFullScreen] = useState(false)

  const switchToFullScreen = () => {
    setIsFullScreen(true)
  }
  const switchFromFullScreen = () => {
    setIsFullScreen(false)
  }

  return (
    <FullScreenContext.Provider
      value={{ switchToFullScreen, switchFromFullScreen }}
    >
      <Tab.Navigator
        tabBar={(props) => (isFullScreen ? null : <TabBar {...props} />)}
        initialRouteName="Network"
        screenOptions={{
          header: () => (isFullScreen ? null : <Header />),
        }}
      >
        <Tab.Screen name="Network" component={NetworkScreen} />
        <Tab.Screen name="Add" component={QrScanScreen} />
        <Tab.Screen name="Explore" component={ExploreScreen} />
      </Tab.Navigator>
    </FullScreenContext.Provider>
  )
}

export default HomeTabNavigator

export const useFullScreen = () => useContext(FullScreenContext)

export { FullScreenContext }
