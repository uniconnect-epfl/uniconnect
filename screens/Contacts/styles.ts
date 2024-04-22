import { StyleSheet } from "react-native" 
import { peach, lightGray, lightPeach, black } from "../../assets/colors/colors" 

export const styles = StyleSheet.create({
    cardContainer: {
        alignItems: "center",
        backgroundColor: lightPeach,
        borderColor: peach,
        borderRadius: 100,
        flexDirection: "row",
        marginVertical: 8,
    },
    contactList: {
        alignItems: "center",
        justifyContent: "center",
    },
    container: {
        flex: 1,
        marginHorizontal: "3%",
    },
    informationsContainer: {
        borderColor: peach,
        borderRadius: 100,
        borderWidth: 2,
        flex: 1,
        paddingLeft: "20%",
        paddingRight: "5%",
    },
    profilePicture: {
        alignItems: "center",
        borderColor: peach,
        borderRadius: 100,
        borderWidth: 2,
        justifyContent: "center",
        left: 0,
        position: "absolute",
    },
    searchBar: {
        borderColor: lightGray,
        borderRadius: 40,
        borderWidth: 1,
        height: "8%",
        marginVertical: "2%",
        padding: "20%",
    }, 
    separationBar: {
        backgroundColor: black,
        borderRadius: 1,
        height: 1,
        marginTop: 8,
    },
})
  