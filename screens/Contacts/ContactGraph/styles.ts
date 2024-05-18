import { StyleSheet } from "react-native"
import { lightPeach, peach } from "../../../assets/colors/colors"

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  graphContainer: {
    backgroundColor: lightPeach, // Add background color
    borderColor: peach, // Add border color
    borderRadius: 10, // Round the corners
    borderWidth: 3, // Add border width
    flex: 1,
    flexWrap: "wrap",
    marginVertical: 10,
    overflow: "hidden",
    width: "100%",
  },
})
