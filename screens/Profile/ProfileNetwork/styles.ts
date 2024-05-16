import { StyleSheet } from "react-native"
import { lightPeach, peach } from "../../../assets/colors/colors"

export const styles = StyleSheet.create({
    contactCard: {
        alignItems: 'center',
        backgroundColor: lightPeach,
        borderColor: peach,
        borderRadius: 20,
        borderWidth: 2,
        height: "83%",
        margin: "3%",
        padding: 5,
        width: "44%",
    },
    container: {
        alignItems: "center",
        flex: 1,
        justifyContent: "center",
    },
    description: {
        marginLeft: 5,
        width: "60%",
    },
    horizontalContainer: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        width: "100%",
    },
    list: {
        flex: 1,
        width: "100%",
    },
    nameContainer: {
        alignItems: "flex-start",
        height: "40%",
        marginLeft: 8,
        width: "100%",
    },
    profilePicture: {
        alignItems: 'center',
        backgroundColor: peach,
        borderRadius: 100,
        height: 50,
        justifyContent: 'center',
        width: 50,
    },
    row: {
        flex: 1,
        justifyContent: "flex-start"
    },
    searchBarContainer: {
        height: 70,
        width: "100%", 
    },
})