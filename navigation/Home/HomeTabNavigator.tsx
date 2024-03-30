// HomeTabNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Image } from 'react-native';
import OnboardingScreen from '../screens/Onboarding/OnboardingScreen';
import MyProfileScreen from '../screens/Profile/MyProfileScreen';
import AuthenticationScreen from '../screens/Registration/AuthenticationScreen';
// Import other screens as needed

// Import your tab icons
import HomeIcon from '../assets/home-icon.png'; // Replace with your actual icon
import ProfileIcon from '../assets/profile-icon.png'; // Replace with your actual icon
import AddIcon from '../assets/add-icon.png'; // Replace with your actual icon
import { tabBarBorder, tabBarorange } from '../../assets/colors/colors.js';

const Tab = createBottomTabNavigator();

const HomeTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color}) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = HomeIcon;
          } else if (route.name === 'Profile') {
            iconName = ProfileIcon;
          } else if (route.name === 'Add') {
            iconName = AddIcon;
          }

          // You can return any component that you like here, such as an image
          return <Image source={iconName} style={[styles.icon, { tintColor: color }]} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        
      })}
    >
      <Tab.Screen name="Home" component={OnboardingScreen} />
      <Tab.Screen name="Add" component={AuthenticationScreen} />
      <Tab.Screen name="Profile" component={MyProfileScreen} />
      {/* Add additional tabs for other screens as needed */}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  icon: {
    height: 28,
    width: 28, // Set the size of the tab icons
  },
  tabBar: {
    backgroundColor: tabBarorange, // Color for the tab bar
    borderTopColor: tabBarBorder, // Border color for the tab bar
    height: 60, // Adjust your tab bar height here
  }
  
});

export default HomeTabNavigator;