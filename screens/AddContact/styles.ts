import { StyleSheet } from "react-native"
import { lightPeach, peach } from "../../assets/colors/colors"

export const styles = StyleSheet.create({
    addButton: {
        backgroundColor: lightPeach,
        borderColor: peach,
        borderRadius: 20,
        borderWidth: 2,
        elevation: 6,
        paddingHorizontal: 30,
        paddingVertical: 20,
    },
    addButtonContainer: {
        alignItems: "center",
        flex: 0.3,
        justifyContent: "center",
    },
    container: {
        alignItems: "center",
        flex: 1,
        justifyContent: "center",
    },
    description: {
        margin: 20,
    },
    horizontalContainer: {
        flexDirection: "row",
        width: "100%",
    },
    infosContainer: {
        alignItems: "center",
        flex: 0.4,
        justifyContent: "flex-start",
    },
    profilePicture: {
        alignItems: "center",
        backgroundColor: peach,
        borderRadius: 100,
        height: 200,
        justifyContent: "center",
        margin: 20,
        width: 200,
    },
    profilePictureContainer: {
        alignItems: "center",
        flex: 0.3,
        justifyContent: "center",
        paddingBottom: "10%",
        paddingTop: "30%",
    },
})