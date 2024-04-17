import { StyleSheet } from "react-native" 
import { black, lightGray, peach, transparent } from "../../assets/colors/colors"

export const styles = StyleSheet.create({
    choiceContainer: {
        alignItems: "center",
        justifyContent: "center",
    },
    choicesContainer: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    selectedBar: {
        backgroundColor: peach,
        borderRadius: 2,
        height: 4,
    },
    selectedText: {
        color: black,
        fontWeight: "bold",
    },
    unselectedBar: {
        backgroundColor: transparent
    },
    unselectedText: {
        color: lightGray,
        fontWeight: "bold",
    }

})