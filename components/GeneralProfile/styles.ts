import { StyleSheet } from "react-native"
import { peach } from "../../assets/colors/colors"

export const styles = StyleSheet.create({
    container: {
        alignContent: "center",
        flex: 1,
        justifyContent: "center",
    },
    horizontalContainer: {
        flex: 1,
        flexDirection: "row"
    },
    profilePicture: {
        alignItems: "center",
        backgroundColor: peach,
        borderRadius: 40, // to make it circular
        height: 80,
        justifyContent: "center",
        width: 80,
    },

})