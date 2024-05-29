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
  modalEventDate: {
    fontFamily: globalStyles.text.fontFamily,
    fontSize: 14,
    fontStyle: "italic",
    left: 20,
    position: "absolute",
    top: 70,
  },
  modalEventDescription: {
    fontFamily: globalStyles.text.fontFamily,
    fontSize: 14,
    left: 20,
    position: "absolute",
    top: 100,
  },
  modalEventLocation: {
    fontFamily: globalStyles.text.fontFamily,
    fontSize: 14,
    fontStyle: "italic",
    left: 20,
    position: "absolute",
    top: 50,
  },
  modalEventTitle: {
    fontFamily: globalStyles.boldText.fontFamily,
    fontSize: 18,
    left: 20,
    position: "absolute",
    top: 20,
  },

  modalView: {
    alignItems: "center",
    backgroundColor: lightPeach,
    borderColor: peach,
    borderRadius: 20,
    borderWidth: 3,
    elevation: 5,
    height: "40%",
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
