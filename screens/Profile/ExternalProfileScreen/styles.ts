import { StyleSheet } from "react-native"
import { black, lightPeach, peach } from "../../../assets/colors/colors"

export const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        flex: 1,
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
    
})