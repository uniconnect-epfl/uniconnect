import * as React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import ExploreScreen from "../../screens/Home/ExploreScreen"
import { TabBar } from "../../components/TabBar/TabBar"
import { Header } from "../../components/Header/Header"
import NetworkScreen from "../../screens/Contacts/NetworkScreen"
import QrScanScreen from "../../screens/QrScan/QrScanScreen"

const Tab = createBottomTabNavigator()

// Create the TabNavigator used by the app after the user login. Allows the user to navigate from one screen to another
const HomeTabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <TabBar {...props} />}
      initialRouteName="Network"
      screenOptions={{
        header: () => <Header />,
      }}
    >
      <Tab.Screen name="Network" component={NetworkScreen} />
      <Tab.Screen name="Add" component={QrScanScreen} />
      <Tab.Screen name="Explore" component={ExploreScreen} />
    </Tab.Navigator>
  )
}

export default HomeTabNavigator
