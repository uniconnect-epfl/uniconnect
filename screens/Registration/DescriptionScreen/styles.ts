import { StyleSheet } from "react-native"

import {
  white,
  black,
  lightPeach,
  peach,
  shadowColor,
} from "../../../assets/colors/colors"

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: white,
    justifyContent: "center",
  },

  description: {
    backgroundColor: lightPeach,
    borderColor: black,
    borderRadius: 20,
    borderWidth: 2,
    fontSize: 18,
    height: "70%",
    marginHorizontal: 20,
    marginVertical: 20,
    padding: 20,
    paddingTop: 20,
    top: 0,
    width: "90%",
  },

  title: {
    fontSize: 21,
    position: "absolute",
    top: 70,
  },
  validation: {
    alignItems: "center",
    backgroundColor: lightPeach,
    borderColor: peach,
    borderRadius: 20,
    borderWidth: 2,
    display: "flex",
    elevation: 8,
    height: 30,
    justifyContent: "center",
    shadowColor,
    shadowOffset: { width: 0, height: 2.5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    width: "30%",
  },
})

export default styles
