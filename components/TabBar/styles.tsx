import { StyleSheet } from "react-native"
import { lightPeach, peach } from "../../assets/colors/colors"

export const styles = StyleSheet.create({
    button: {
      alignItems: 'center',
    },
    iconContainer: {
      alignItems: 'center',
      height: 32,
      justifyContent: 'center',
      width: 32
    },
    tabBar: {
      alignItems: 'center',
      backgroundColor: lightPeach,
      elevation: 5,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      paddingTop: 8,
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.3,
      shadowRadius: 3
    },
    text: {
      color: peach,
      fontSize: 12,
      paddingTop: 4
    }
  })