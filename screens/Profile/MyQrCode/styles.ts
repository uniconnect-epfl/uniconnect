import { StyleSheet } from "react-native"
import { lightPeach } from "../../../assets/colors/colors"

export const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        flex: 1,
        justifyContent: "center",
    },
    qrContainer: {
        alignItems: "center",
        backgroundColor: lightPeach,
        height: "40%",
        justifyContent: "center",
        width: "80%",
    },
    textContainer: {
        alignItems: "center",
        height: "30%",
        justifyContent: "center",
    }

})