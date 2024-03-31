/* eslint-disable react/prop-types */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import {OnboardingScreen} from '../../screens/Onboarding/OnboardingScreen';
import {MyProfileScreen} from '../../screens/Profile/MyProfileScreen/MyProfileScreen';
import {AuthenticationScreen} from '../../screens/Registration/AuthenticationScreen/AuthenticationScreen';


// Import your tab icons
import { white, peach } from '../../assets/colors/colors';


const Tab = createBottomTabNavigator();

const HomeTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconSource;
          if (route.name === 'Home') {
            iconSource = require('../../assets/home-icon.png');
          } else if (route.name === 'Profile') {
            iconSource = require('../../assets/explore-icon.png');
          } else if (route.name === 'Add') {
            iconSource = require('../../assets/add-icon.png');
          }
          const isAddButton = route.name === 'Add'; // Check if this is the Add button

          // Custom styling for the Add button
          const addStyle = isAddButton ? styles.addButton : {};

          return (
            <View style={[styles.iconContainer, addStyle]}>
              <Image source={iconSource} style={[styles.icon, { tintColor: focused ? peach : 'gray' }]} />
            </View>
          );
        },
        tabBarButton: (props) => {
          // If it's the 'Add' button, we add some custom styling
          if (route.name === 'Add') {
            return (
              <TouchableOpacity {...props} style={styles.addButton}>
                {props.children}
              </TouchableOpacity>
            );
          }
          return <TouchableOpacity {...props} activeOpacity={1} />;
        },
        tabBarActiveTintColor: peach,
        tabBarInactiveTintColor: 'gray',
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      })}
      initialRouteName="Home"
    >
      <Tab.Screen name="Home" component={OnboardingScreen} />
      <Tab.Screen name="Add" component={AuthenticationScreen} options={{
        tabBarLabel: '',
        tabBarIcon: ({ focused }) => (
          <Image
            source= {require('../../assets/add-icon.png')}
            style={{
              width: 70, // Make this icon larger
              height: 70,
              tintColor: focused ? white : peach,
            }}
          />
        ),
      }} />
      <Tab.Screen name="Profile" component={MyProfileScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  
  
  addButton: {
    // Custom styles for the 'Add' button
    backgroundColor: white, // Example background color
    borderRadius: 25,
    marginVertical: -20,         // Example border radius to make it circular
    padding: 10,            // Example padding
      // Adjust the vertical position
  },
  icon: {
    height: 28,
    width: 28,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  tabBar: {
    backgroundColor: white,
    borderTopColor: peach,
    height: 60,
    position: 'relative', // This is important to position the Add button absolutely
  },
});

export default HomeTabNavigator;
