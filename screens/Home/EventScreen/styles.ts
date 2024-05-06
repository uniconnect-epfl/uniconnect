import { StyleSheet } from "react-native"
import {
  lightGray,
  lightPeach,
  peach,
  white,
} from "../../../assets/colors/colors"

export const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: peach,
    borderRadius: 40,
    color: lightPeach,
    justifyContent: "center",
    margin: "3%"
  },
  containerEvent: {
    flex: 1,
  },
  header: {
    fontSize: 18,
    textAlign: "left",
    textDecorationLine: 'underline'
  },
  iconText: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center"
  },
  input: {
    borderColor: lightGray,
    borderRadius: 40,
    borderWidth: 1,
    fontFamily: "JetBrainsMono_400Regular",
    height: 40,
    paddingHorizontal: 20,
    width: "70%"
  },
  map: {
    alignItems: "center",
    backgroundColor: lightPeach,
    borderColor: peach,
    borderRadius: 20,
    borderWidth: 3,
    height: 40,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  searchAndMap: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: "2.5%",
  },
  sectionHeader: {
    alignItems: "center",
    backgroundColor: white,
    flexDirection: "row",
    justifyContent: "space-between",
    margin: "2.5%"
  },
  text: {
    fontFamily: "JetBrainsMono_400Regular",
    fontSize: 12,
    letterSpacing: -0.5,
    paddingRight: 3
  },
  view: {
    flex: 1,
  }
})
