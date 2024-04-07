import { StyleSheet } from "react-native"
import {  shadowColor, tabBarFill, peach } from '../../assets/colors/colors'


const shadow = StyleSheet.create({
    shadow: {
      elevation: 5,
      shadowColor: shadowColor,
      shadowOffset: {
        height: 10,
        width: 0,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.5,
    },
  });
  
export const styles = StyleSheet.create({
    icon: {
      // Properties for icon will go here
    },
    iconContainer: {
      alignItems: 'center',
      display: 'flex',
      height: 24,
      justifyContent: 'center',
      width: 24,
    },
    tabBar: {
      alignItems: 'center',
      backgroundColor: tabBarFill,
      borderRadius: 10, // Adjust the color to match your design
      borderTopColor: peach,
      borderTopWidth: 3,
      
      flexDirection: 'row',
      height: 60, // Defined height for the bar
      justifyContent: 'space-evenly',
      marginBottom: 20,
      marginHorizontal: 20,
      ...shadow.shadow,
    },
  });
  