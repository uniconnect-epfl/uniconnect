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
        height: 3,
        width: '100%'
    },
    tabContainer: {
        alignItems: "center",
        height: 40,
        justifyContent: "space-between",
        paddingVertical: 5,
        width: '50%'
    },
    tabsContainer: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: '2.5%'
    },
    unselectedBar: {
        backgroundColor: transparent
    },

})