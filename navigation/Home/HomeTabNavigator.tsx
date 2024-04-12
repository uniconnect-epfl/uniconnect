import React from 'react'  
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'  
import { View } from 'react-native'  
import { Ionicons } from '@expo/vector-icons'  

import { MyProfileScreen } from '../../screens/Profile/MyProfileScreen/MyProfileScreen'  
import { styles } from './styles'  
import { peach } from '../../assets/colors/colors'  

const Tab = createBottomTabNavigator()  

type IoniconName = 'home' | 'add' | 'search'  

const TabBarIcon = ({ iconName, focused }: { iconName: IoniconName  ; focused: boolean }) => (
  <View style={styles.iconContainer}>
    <Ionicons
      style={styles.icon}
      name={iconName}
      size={focused ? 35 : 24}
      color={focused ? peach : 'black'}
    />
  </View>
)  

const HomeTabNavigator = () => {
  const getIconName = (routeName: string): IoniconName => {
    switch (routeName) {
      case 'Add':
        return 'add'  
      case 'Profile':
        return 'search'  
      default:
        return 'home'  
    }
  }  

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          const iconName: IoniconName = getIconName(route.name)  
          return <TabBarIcon iconName={iconName} focused={focused} />  
        },
        tabBarActiveTintColor: peach,
        tabBarInactiveTintColor: 'gray',
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      })}
      initialRouteName="Home">
      <Tab.Screen name="Add" component={MyProfileScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={MyProfileScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  )  
}  

export default HomeTabNavigator  
