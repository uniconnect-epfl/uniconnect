import { StyleSheet } from "react-native"
import { lightGray, lightPeach, peach } from "../../../assets/colors/colors"

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: "nowrap",
  },
  graphContainer: {
    alignSelf: "center",
    backgroundColor: lightPeach, // Add background color
    borderColor: peach, // Add border color
    borderRadius: 10, // Round the corners
    borderWidth: 3, // Add border width
    flex: 1,
    marginBottom: 10,
    overflow: "hidden", // Hide overflow
    width: "90%",
  },
  searchBar: {
    alignSelf: "center",
    borderColor: lightGray,
    borderRadius: 40,
    borderWidth: 1,
    height: 40,
    marginVertical: 10,
    padding: 20,
    width: "90%",
  },
})
