import { StyleSheet } from "react-native"
import { black, lightPeach, peach, white } from "../../../assets/colors/colors"

export const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        backgroundColor: white,
        flex: 1,
        justifyContent: "flex-start",
    },
    invertedButtonColors: {
        backgroundColor: peach,
        borderColor: lightPeach,
    },
    separatorLine: {
        backgroundColor: black,
        height: 1,
        marginVertical: 5,
        width: "auto",
    },
    uniqueButton: {
        marginLeft: "40%",
        marginRight: "10%",
        width: "50%",
    },
    
})