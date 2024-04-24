import { StyleSheet } from "react-native" 
import { lightPeach, peach } from "../../assets/colors/colors"

export const styles = StyleSheet.create({
    authorizationText: {
        marginVertical: "20%",
        textAlign: "center"
    },
    container: {
        alignItems: "center",
        flex: 1,
        justifyContent: "center",
    },
    requestAuthorizationContainer: {
        alignItems: "center",
        backgroundColor: lightPeach,
        borderRadius: 30,
        height: "50%",
        justifyContent: "center",
        padding: 20,
        width: "70%",
    },
    requestAuthorizationsButton: {
        alignItems: "center",
        borderColor: peach,
        borderRadius: 20,
        borderWidth: 2,
        height: "20%",
        justifyContent: "center",
        marginVertical: "20%",
        width: "70%",
    },

})
  