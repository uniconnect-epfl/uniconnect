import { StyleSheet } from "react-native"
import { black, lightPeach, peach, white } from "../../assets/colors/colors"

export const styles = StyleSheet.create({
    buttonText: {
      fontSize: 16,
    },
    description: {
      backgroundColor: lightPeach,
      borderColor: black,
      borderRadius: 20,
      borderWidth: 2,
      fontSize: 14,
      height: 200,
      marginHorizontal: 20,
      marginVertical: 10,
      padding: 20,
      paddingTop: 20,
      top: 0,
      width: "90%"
    },
    doneButton: {
      alignItems: "center",
      backgroundColor: lightPeach,
      borderColor: peach,
      borderRadius: 20,
      borderWidth: 2,
      elevation: 8,
      justifyContent: "center",
      marginVertical: 10,
      padding: 10,
      shadowColor: black,
      shadowOffset: { width: 0, height: 2.5 },
      shadowOpacity: 0.3,
      shadowRadius: 5,
      width: "60%"
    },
    modal: {
      alignItems: "center",
      alignSelf: "center",
      backgroundColor: white,
      borderRadius: 20,
      padding: 10,
      position: "absolute",
      top: "20%",
      width: "90%"
    },
    modalBackground: {
      alignItems: "center",
      backgroundColor: black,
      height: "100%",
      justifyContent: "center",
      opacity: 0.9,
      position: "absolute",
      width: "100%"
    },
    modalContainer: {
      alignItems: "center",
      width: "100%"
    },
})