import { StyleSheet } from "react-native"
import {
  white,
  black,
  lightGray,
  lightPeach,
  peach,
  shadowColor,
} from "../../assets/colors/colors"

import {
  BUTTON_HEIGHT,
  BUTTON_RADIUS,
  BUTTON_TEXT_FONT_SIZE,
} from "../../assets/global/constants"

const styles = StyleSheet.create({
  border: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  button: {
    alignItems: "center",
    backgroundColor: lightPeach,
    borderColor: peach,
    borderRadius: BUTTON_RADIUS,
    borderWidth: 2,
    elevation: 8,
    height: BUTTON_HEIGHT,
    justifyContent: "center",
    marginBottom: 10,
    shadowColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    width: "100%",
  },
  buttonGoogle: {
    alignItems: "center",
    backgroundColor: white,
    borderRadius: BUTTON_RADIUS,
    borderWidth: 1,
    display: "flex",
    flexDirection: "row",
    height: BUTTON_HEIGHT,
    justifyContent: "flex-start",
    paddingLeft: 15,
    shadowColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    width: "100%",
  },

  buttonPlaceholder: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  buttonText: {
    color: black,
    fontSize: BUTTON_TEXT_FONT_SIZE,
  },
  buttonTextGoogle: {
    color: black,
    fontSize: BUTTON_TEXT_FONT_SIZE,
    fontWeight: "bold",
  },
  container: {
    alignItems: "center",
    flex: 1,
    gap: 1,
    padding: 20,
  },
  footer: {
    display: "flex",
    flexDirection: "row",
    position: "absolute",
    zIndex: -1,
  },
  icon: {
    paddingRight: 25,
  },
  image: {
    height: 250,
    marginBottom: 10,
    marginRight: 30,
    width: 250,
  },
  inputField: {
    borderColor: lightGray,
    borderRadius: BUTTON_RADIUS,
    borderWidth: 1,
    fontSize: BUTTON_TEXT_FONT_SIZE,
    height: BUTTON_HEIGHT,
    marginBottom: 20,
    padding: 10,
    width: "100%",
  },
  smallText: {
    color: black,
    fontSize: 10,
    marginBottom: 20,
    textDecorationLine: "underline",
  },
  specialText: {
    color: peach,
    fontSize: 10,
  },
})

export default styles
