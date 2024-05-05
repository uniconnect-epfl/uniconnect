import { StyleSheet } from "react-native" 
import { black, lightPeach } from "../../assets/colors/colors"

export const viewDetailsStyles = StyleSheet.create({
    descriptionContainer: {
        margin: "5%",
    },
    detailsContainer: {
        flex: 1,
        margin: "5%",
        width: "90%",
    },
    detailsText: {
        marginVertical: 3,
        textAlign: "left",
    },
    profileContainer: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "flex-start",
        marginVertical: 3,
    },
    separationBar: {
        backgroundColor: black,
        borderRadius: 1,
        height: 1,
        marginTop: 8,
    },
    title: {
        fontSize: 30,
    },
    topBackground: {
        backgroundColor: lightPeach,
        height: "20%",
        top: 0,
        width: "100%"
    },
})