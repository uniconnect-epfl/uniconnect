import { StyleSheet } from "react-native"
import { black, lightPeach, peach, white } from "../../../assets/colors/colors"

export const styles = StyleSheet.create({
    activityIndicator: {
      marginVertical: 5
    },
    buttonText: {
      fontSize: 16,
    },
    changePictureButton: {
      left: 90,
      position: "absolute",
      top: -10
    },
    container: {
        alignItems: "center",
        flex: 1,
    },
    header: {
      flexDirection: "row",
      marginBottom: 5,
      marginHorizontal: "2.5%"
    },
    image: {
        borderRadius: 50,
        borderWidth: 1,
        height: 100,
        marginVertical: 10,
        width: 100,
    },
    inputs: {
      height: '70%',
      width: '80%'
    },
    main: {
      backgroundColor: white,
      flex: 1
    },
    submitButton: {
      alignItems: "center",
      alignSelf: "center",
      backgroundColor: lightPeach,
      borderColor: peach,
      borderRadius: 20,
      borderWidth: 2,
      elevation: 8,
      justifyContent: "center",
      padding: 10,
      shadowColor: black,
      shadowOffset: { width: 0, height: 2.5 },
      shadowOpacity: 0.3,
      shadowRadius: 5,
      width: "60%",
    }
})