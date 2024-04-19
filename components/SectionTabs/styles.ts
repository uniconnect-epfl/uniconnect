import { StyleSheet } from "react-native" 
import { black, lightGray, peach, transparent } from "../../assets/colors/colors"

export const styles = StyleSheet.create({
    black: {
        color: black,
    },
    lightGray: {
        color: lightGray,
    },
    selectedBar: {
        backgroundColor: peach,
        borderRadius: 2,
        height: 4,
    },
    tabContainer: {
        alignItems: "center",
        justifyContent: "center",
    },
    tabsContainer: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    unselectedBar: {
        backgroundColor: transparent
    },

})