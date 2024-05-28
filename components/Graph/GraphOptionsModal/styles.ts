import { StyleSheet } from "react-native"

import { lightPeach, peach, black } from "../../../assets/colors/colors"
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
  modalTitle: {
    ...globalStyles.boldText,
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
    height: "30%",
    justifyContent: "flex-end",
    margin: 20,
    padding: 35,
    shadowColor: black,
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    width: "90%",
  },
  resetIcon: {
    position: "absolute",
    right: 20,
    top: 20,
  },
  slider: {
    height: "30%",
    paddingTop: 40,
    width: "90%",
  },
  sliderText: {
    ...globalStyles.boldText,
    fontSize: 12,
  },
})

export default styles
