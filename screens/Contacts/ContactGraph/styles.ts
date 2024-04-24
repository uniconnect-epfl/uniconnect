import { StyleSheet } from "react-native" 
import { lightGray } from "../../../assets/colors/colors"

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        zIndex: -1,
    },

    graphContainer: {
        ...StyleSheet.absoluteFillObject,
        zIndex: -1,
    },
    searchBar: {
        borderColor: lightGray,
        borderRadius: 40,
        borderWidth: 1,
        height: 60,
        margin: 10,
        padding: 20, 
    }, 
})
  