import { StyleSheet } from "react-native"
import {
  black,
  lightPeach,
  peach,
  shadowColor,
  white,
  lightGray,
} from "../../assets/colors/colors"

export const styles = StyleSheet.create({
  addTag: {
    alignItems: "center",
    backgroundColor: peach,
    borderRadius: 50,
    padding: 5,
    width: "27%",
  },
  body: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
    padding: 20,
  },
  bottomButtons: {
    alignItems: "center",
    flex: 1,
  },
  button: {
    alignItems: "center",
    backgroundColor: peach,
    padding: 10,
  },
  buttonBase: {
    backgroundColor: lightPeach,
    borderColor: peach,
    borderRadius: 20,
    borderWidth: 2,
    display: "flex",
    elevation: 4,
    height: "auto",
    margin: 20,
    padding: 7,
    paddingHorizontal: 25,
    shadowColor,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  buttonText: {
    color: black,
  },
  container: {
    backgroundColor: white,
    flex: 1,
  },
  eventDetailsContainer: {
    paddingTop: 20,
  },
  header: {
    backgroundColor: lightPeach,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: "3%",
    paddingVertical: 20,
    width: "100%"
  },
  headerIcon: {
    alignItems: "center",
    flex: 1,
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
  mandatoryInput: {
    flexDirection: "row",
  },

  section: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginBottom: 50,
    paddingHorizontal: 20,
    paddingTop: 10,
    width: "100%",
  },
  tags: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  tagsSeparator: {
    borderBottomColor: black,
    borderBottomWidth: 1,
    paddingBottom: 20,
  },
  tagsTitle: {
    color: black,
    marginBottom: 10,
    padding: 10,
  },
})