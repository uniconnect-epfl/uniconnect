import { StyleSheet } from "react-native"
import { lightPeach } from "../../../assets/colors/colors"

export const styles = StyleSheet.create({
    contactContainer: {
        alignItems: "center",
        backgroundColor: lightPeach,
        borderRadius: 30,
        height: "50%",
        justifyContent: "center",
        width: "80%",
    },
    container: {
        alignItems: "center",
        flex: 1,
        justifyContent: "center",
    },
    qrContainer: {
        alignItems: "center",
        height: "70%",
        justifyContent: "center",
    },
    textContainer: {
        alignItems: "center",
        height: "30%",
        justifyContent: "center",
    }

})