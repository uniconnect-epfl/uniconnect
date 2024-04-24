import { StyleSheet } from "react-native"
import { black, lightPeach, peach } from "../../../assets/colors/colors"

export const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        flex: 1,
        justifyContent: "center",
    },
    invertedButtonColors: {
        backgroundColor: peach,
        borderColor: lightPeach,
    },
    separatorLine: {
        backgroundColor: black,
        height: 1,
        marginTop: 5,
        width: "auto",
    },
    
})