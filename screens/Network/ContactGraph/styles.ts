import { StyleSheet } from "react-native"
import { lightPeach, peach } from "../../../assets/colors/colors"

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: "nowrap",
  },
  graphContainer: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: lightPeach, // Add background color
    borderColor: peach, // Add border color
    borderRadius: 10, // Round the corners
    borderWidth: 3, // Add border width
    flex: 1,
    justifyContent: "center",
    marginBottom: 10,
    overflow: "hidden", // Hide overflow
    width: "90%",
  },
})
