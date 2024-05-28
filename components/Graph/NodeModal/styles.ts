import { StyleSheet } from "react-native"
import { black, lightPeach, peach } from "../../../assets/colors/colors"
import { globalStyles } from "../../../assets/global/globalStyles"

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
  modalProfileDescription: {
    fontFamily: globalStyles.text.fontFamily,
    fontSize: 16,
    left: 20,
    position: "absolute",
    top: 160,
  },
  modalProfileInterests: {
    fontSize: 14,
    fontStyle: "italic",
    height: 80,
    left: 120,
    lineHeight: 25,
    position: "absolute",
    top: 20,
  },
  modalProfileName: {
    fontFamily: globalStyles.boldText.fontFamily,
    fontSize: 20,
    left: 20,
    position: "absolute",
    top: 120,
  },
  modalProfilePicture: {
    alignItems: "center",
    borderColor: peach,
    borderRadius: 100,
    borderWidth: 2,
    height: 80,
    justifyContent: "center",
    left: 20,
    position: "absolute",
    top: 20,
    width: 80,
  },
  modalView: {
    alignItems: "center",
    backgroundColor: lightPeach,
    borderColor: peach,
    borderRadius: 20,
    borderWidth: 3,
    elevation: 5,
    height: "40%",
    justifyContent: "flex-end",
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
