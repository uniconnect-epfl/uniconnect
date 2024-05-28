import { StyleSheet } from "react-native"
import { lightPeach, peach } from "../../../assets/colors/colors"

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: "nowrap",
  },

  contractIcon: {
    position: "absolute",
    right: 20,
    top: 50,
    zIndex: 1,
  },
  expandIcon: {
    position: "absolute",
    right: 15,
    top: 15,
    zIndex: 1,
  },
  graphContainer: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: lightPeach, // Add background color
    borderColor: peach, // Add border color
    borderRadius: 40, // Round the corners
    borderWidth: 3, // Add border width
    flex: 1,
    justifyContent: "center",
    marginBottom: 10,
    overflow: "hidden", // Hide overflow
    width: "90%",
  },

  graphContainerFullScreen: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: lightPeach, // Add background color
    flex: 1,
    justifyContent: "center",
    width: "100%",
  },

  nofriends: {
    height: "100%",
    resizeMode: "contain",
    width: "100%",
  },

  simulationOptionIcon: {
    position: "absolute",
    zIndex: 1,
  },
})
