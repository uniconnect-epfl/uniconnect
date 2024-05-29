import { StyleSheet } from "react-native"
import { black, lightGray, peach, white } from "../../../assets/colors/colors"

export const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: peach,
    borderRadius: 20,
    flexDirection: "row",
    height: 40,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  container: {
    flex: 1,
  },
  createEvent: { color: black },
  createEventWrapper: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    paddingBottom: 10,
  },
  input: {
    borderColor: lightGray,
    borderRadius: 40,
    borderWidth: 1,
    fontFamily: "JetBrainsMono_400Regular",
    height: 40,
    paddingHorizontal: 20,
    width: "100%",
  },
  searchAndMap: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: "2.5%",
  },
  text: {
    color: white,
    fontFamily: "JetBrainsMono_700Bold",
    fontSize: 14,
    letterSpacing: -0.5,
    paddingRight: 3,
  },
  view: {
    flex: 1,
  },
})
