import { StyleSheet } from "react-native"
import {
  black,
  lightGray,
  lightPeach,
  peach,
  shadowColor,
  white,
} from "../../assets/colors/colors"

export const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: peach,
    borderRadius: 40,
    color: lightPeach,

    display: "flex",

    justifyContent: "center",
    margin: "3%",
    shadowColor: shadowColor,
    shadowOffset: { height: 3, width: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 1.5,
  },
  cardContainer: {
    flex: 1,
    padding: 10,
  },

  containerEvent: {
    flex: 1,
  },
  header: {
    // A soft, inviting color
    borderRadius: 10, // Rounded corners for a friendly look
    color: black,

    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: "3%",
    textAlign: "left",
  },

  input: {
    borderColor: lightGray,
    borderRadius: 40,
    borderWidth: 1,
    height: 60,
    margin: "3%",
    padding: 20,
    width: "70%",
    // Note: Exceeding 100% can lead to layout overflow
  },
  itemContainer: {
    backgroundColor: white,
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 8,
    padding: 20,
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  map: {
    backgroundColor: lightPeach,
    borderColor: peach,
    borderRadius: 40,
    borderWidth: 2,
    fontWeight: "bold",
    height: 60,
    justifyContent: "center",
    marginTop: 10,
    overflow: "visible",

    paddingHorizontal: 5,
    paddingVertical: "auto",
    shadowColor: shadowColor,
    shadowOffset: { height: 3, width: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 1.5,

    width: "100%",
  },
  row: {
    flexDirection: "row",

    justifyContent: "space-evenly",
  },
  searchAndMap: {
    flexDirection: "row",
    justifyContent: "center",
  },
  separationBar: {
    backgroundColor: black,
    borderRadius: 1,
    height: 1,
    marginLeft: "3%",
    marginRight: "50%",
  },
  title: {
    color: black,
    fontSize: 20,
    fontWeight: "bold",
  },

  transparent: {
    opacity: 0,
  },
  view: {
    flex: 1,
  },
})
