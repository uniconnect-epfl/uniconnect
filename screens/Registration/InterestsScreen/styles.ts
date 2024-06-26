import { StyleSheet } from "react-native"
import {
  lightGray,
  peach,
  black,
  lightPeach,
  white,
  shadowColor,
} from "../../../assets/colors/colors"
import { BUTTON_HEIGHT, BUTTON_RADIUS } from "../../../assets/global/constants"

const styles = StyleSheet.create({
  buttonSmall: {
    alignItems: "center",
    backgroundColor: lightPeach,
    borderColor: peach,
    borderRadius: BUTTON_RADIUS,
    borderWidth: 2,
    display: "flex",
    elevation: 8,
    height: 40,
    justifyContent: "center",
    marginHorizontal: 5,
    shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    width: 90,
  },

  buttonSmallLeft: {
    backgroundColor: peach,
  },

  buttonText: {
    color: black,
  },

  buttonTextLeft: {
    color: white,
  },

  container: {
    backgroundColor: white,
    height: "100%",
  },

  footer: {
    position: "absolute",
    width: "100%",
  },

  footerButton: {
    backgroundColor: white,
    borderRadius: BUTTON_RADIUS,
    paddingHorizontal: 30,
    paddingVertical: 15,
  },
  footerButtonText: {
    color: black,
    textAlign: "center",
  },

  image: {
    alignSelf: "center",
    height: "10%",
    marginRight: 10,
    width: "15%",
  },

  input: {
    alignSelf: "center",
    borderColor: lightGray,
    borderRadius: BUTTON_RADIUS,
    borderWidth: 1,
    height: BUTTON_HEIGHT,
    marginBottom: 10,
    paddingHorizontal: 30,
    width: "95%",
  },

  interestButton: {
    alignContent: "center",
    borderColor: lightGray,
    borderRadius: 10,
    borderWidth: 2,
    display: "flex",
    height: 110,
    justifyContent: "center",
    marginBottom: 10,
    marginHorizontal: 10,
    padding: 10,
    width: 150,
  },

  interestText: {
    color: lightGray,
    left: 0,
    right: 0,
    textAlign: "center",
  },

  interestsGrid: {
    alignSelf: "center",
    marginBottom: 10,
  },

  labelContainer: {
    alignItems: "center",
    flexDirection: "row",
    flexGrow: 1,
    flexWrap: "wrap",
  },

  labelView: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    height: "20%",
    marginBottom: 10,
    marginHorizontal: 20,
    maxHeight: 150,
    overflow: "hidden",
    paddingHorizontal: 10,
  },

  selectedInterestButton: {
    backgroundColor: white,
    borderColor: peach,
    borderWidth: 2.5,
  },

  selectedInterestText: {
    color: black,
  },

  title: {
    fontSize: 24,

    paddingBottom: 10,
    textAlign: "center",
  },
})
export default styles
