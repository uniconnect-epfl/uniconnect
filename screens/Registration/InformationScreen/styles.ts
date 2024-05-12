import { StyleSheet } from "react-native"
import {
  peach,
  black,
  lightPeach,
  shadowColor,
  white,
  lightGray,
  gray,
} from "../../../assets/colors/colors"

import { BUTTON_RADIUS } from "../../../assets/global/constants"

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: lightPeach,
    borderColor: peach,
    borderRadius: BUTTON_RADIUS,
    borderWidth: 2,
    elevation: 8, //
    marginHorizontal: 30,
    shadowColor,
    shadowOffset: { width: 0, height: 2.5 },
    shadowOpacity: 0.3,
    shadowRadius: 5
  },

  buttonContainer: {
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 15
  },

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
    flex: 1,
  },

  date: {
    color: gray,
  },

  description: {
    alignSelf: "center",
    borderColor: peach,
    borderRadius: 10,
    borderWidth: 2,
    display: "flex",
    flexDirection: "column",
    height: "17%",
    justifyContent: "space-between",
    padding: 5,
    width: "70%",
  },

  footer: {
    position: "absolute",
    width: "100%",
  },

  image: {
    alignSelf: "center",
    height: 75,
    marginRight: 10,
    width: 75,
  },
  input: {
    borderColor: lightGray,
    borderRadius: 25,
    borderWidth: 1,
    height: 50,
    justifyContent: "center",
    paddingHorizontal: 30,
    width: "100%",
  },
  label: {
    color: black,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: 10,
    paddingLeft: 20,
  },

  locationButton: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
    padding: 5
  },

  locationText: {
    alignSelf: "baseline",
    paddingLeft: 5,
  },

  nextBar: {
    alignItems: "center",
    backgroundColor: lightPeach,
    borderColor: peach,
    borderRadius: BUTTON_RADIUS,
    borderWidth: 2,
    display: "flex",
    flexDirection: "row",
    height: 60,
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 100,
  },
  section: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
    width: "100%",
  },
})

export default styles
