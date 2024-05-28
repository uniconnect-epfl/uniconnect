import { StyleSheet } from "react-native" 
import { black, lightPeach } from "../../assets/colors/colors"

export const viewDetailsStyles = StyleSheet.create({
    descriptionContainer: {
        height: "25%",
        marginVertical: "3%",
    },
    detailsContainer: {
        flex: 1,
        margin: "2.5%",
        width: "90%",
    },
    detailsText: {
        marginVertical: 1,
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
        marginTop: 3,
    },
    title: {
        fontSize: 25,
    },
    topBackground: {
        backgroundColor: lightPeach,
        height: "9%",
        top: 0,
        width: "100%"
    },
})