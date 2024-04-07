
import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import {OnboardingScreen} from '../../screens/Onboarding/OnboardingScreen';
import {MyProfileScreen} from '../../screens/Profile/MyProfileScreen/MyProfileScreen';


import  { Ionicons } from '@expo/vector-icons';

import { styles } from "./styles"
import { peach } from '../../assets/colors/colors';

const Tab = createBottomTabNavigator();


type IoniconName = "home"|"explore"|"add"|"search";



const HomeTabNavigator = () => {
  return (
    <Tab.Navigator
      
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName : IoniconName = "home";
          

          if (route.name === "Home")
          iconName = "home"
          if (route.name === "Add")
          iconName = "add"
          if (route.name === "Profile")
          iconName = "search"
          
          return <View style={styles.iconContainer}><Ionicons style={styles.icon} name={iconName} size={focused? 24: 12} color={focused? peach : "black"} /></View>;
        },
        tabBarActiveTintColor: peach,
        tabBarInactiveTintColor: 'gray',
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      })}
      initialRouteName="Home"
    >
      <Tab.Screen name="Home" component={OnboardingScreen} options={{headerShown: false}} />
      <Tab.Screen name="Add" component={MyProfileScreen} options={{headerShown: false}}/>
      <Tab.Screen name="Profile" component={MyProfileScreen} options={{headerShown: false}}/>
    </Tab.Navigator>
  );
};




export default HomeTabNavigator;

