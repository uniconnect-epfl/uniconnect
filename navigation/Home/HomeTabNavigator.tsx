import * as React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../../screens/Home/HomeScreen'
import { TabBar } from '../../components/TabBar/TabBar'
import { Header } from '../../components/Header/Header'
import ExploreScreen from '../../screens/Contacts/ExploreScreen'

const Tab = createBottomTabNavigator()

// Create the TabNavigator used by the app after the user login. Allows the user to navigate from one screen to another
const HomeTabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={props => <TabBar {...props} />}
      initialRouteName="Home"
      screenOptions={{
        header: () => <Header/>
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen}/>
      <Tab.Screen name="Connections" component={ExploreScreen}/>
      <Tab.Screen name="Explore" component={ExploreScreen}/>
    </Tab.Navigator>
  )
}

export default HomeTabNavigator  
