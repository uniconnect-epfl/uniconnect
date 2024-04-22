import { StyleSheet } from "react-native"
import { lightPeach, peach } from "../../assets/colors/colors"

export const profileStyles = StyleSheet.create({
    button: {
        alignItems: "center",
        backgroundColor: lightPeach,
        borderColor: peach,
        borderRadius: 10,
        borderWidth: 2,
        elevation: 6,
        height: "33%",
        justifyContent: "center",
        width: "45%",
    },
    buttonText: {
        alignItems: "center",
        fontSize: 13,
        justifyContent: "center",
        margin: 1,
    },
    buttonsContainer: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "55%",
    },
    horizontalContainer: {
        alignItems: "center",
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    invertedButtonColors: {
        backgroundColor: peach,
        borderColor: lightPeach,
    },
    profileContainer: {
        flex: 1,
        marginHorizontal: 10,
    },
    topBackground: {
        backgroundColor: lightPeach,
        height: "20%",
        position: "absolute",
        top: 0,
        width: "100%"
    },
    topProfileContainer: {
        flexDirection: "row",
        marginBottom: 4,
        marginTop: "35%",
    },
    
})