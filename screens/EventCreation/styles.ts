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
    padding: 20,
  },
  bottomButtons: {
    alignItems: "center",
    backgroundColor: black,
    flex: 1,
  },
  button: {
    alignItems: "center",
    backgroundColor: peach,
    padding: 10,
  },
  buttonBase: {
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
    alignItems: "center",
    backgroundColor: lightPeach,
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 40,
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
