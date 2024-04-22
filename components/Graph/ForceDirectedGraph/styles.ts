import { StyleSheet } from "react-native"
import { white, black } from "../../../assets/colors/colors"

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  modalContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-end",
  },
  modalProfileName: {
    fontFamily: "JetBrainsMono_700Bold",
    fontSize: 20,
    left: 20,
    position: "absolute",
    top: 120,
  },
  modalProfilePicture: {
    alignItems: "center",
    height: 80,
    justifyContent: "center",
    left: 20,
    position: "absolute",
    top: 20,
    width: 80,
  },
  modalView: {
    alignItems: "center",
    backgroundColor: white,
    borderRadius: 20,
    elevation: 5,
    height: "40%",
    justifyContent: "center",
    margin: 20,
    padding: 35,
    shadowColor: black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    width: "90%",
  },
})

export default styles
