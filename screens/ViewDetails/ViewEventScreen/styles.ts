import { StyleSheet } from "react-native" 
import { peach } from "../../../assets/colors/colors"

export const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        flex: 1,
        justifyContent: "center",
    },
    map: {
        flex: 1,
    },
    mapContainer: {
        borderColor: peach,
        borderRadius: 20,
        borderWidth: 2,
        height: "40%",
        marginHorizontal: "5%",
        marginTop: "5%",
        overflow: "hidden",
        width: "90%",
    },
    
})