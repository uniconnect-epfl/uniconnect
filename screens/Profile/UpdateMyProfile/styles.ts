import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        flex: 1,
        justifyContent: "center",
    },
    image: {
        borderRadius: 50,
        borderWidth: 1,
        height: 100,
        marginVertical: 10,
        width: 100,
    },
    text1: {
      fontSize: 20,
      fontWeight: "bold",
      marginVertical: 10
    },
    text2: {
      fontSize: 16,
      fontStyle: "italic",
      marginVertical: 10
    },
    text3: {
      fontSize: 10,
      marginVertical: 10,
      textAlign: "center"
    }
})