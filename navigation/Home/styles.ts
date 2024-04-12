import { StyleSheet } from "react-native"
import {  shadowColor, lightPeach, peach } from '../../assets/colors/colors'


const shadow = StyleSheet.create({
    shadow: {
      elevation: 5,
      shadowColor,
      shadowOffset: {
        height: 10,
        width: 0,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.5,
    },
  }) 
  
export const styles = StyleSheet.create({
    icon: {
      // Properties for icon will go here
    },
    iconContainer: {
      alignItems: 'center',
      display: 'flex',
      height: 35,
      justifyContent: 'center',
      marginTop: 30,
      width: 35,

      
    },
    icon_add: {
        
    },
    tabBar: {
      alignItems: 'center',
      backgroundColor: lightPeach,
    borderColor: peach,
      borderRadius: 10, // Adjust the color to match your design
      borderWidth: 2,
      flexDirection: 'row',
      height: 60, // Defined height for the bar
      justifyContent: 'space-evenly',
      margin: 20,
      ...shadow.shadow,
      
    },
  }) 
  