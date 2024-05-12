import { StyleSheet } from "react-native"
import { black, lightPeach, peach, shadowColor, white } from "../../assets/colors/colors"

export const styles = StyleSheet.create({
  activeButton: {
    backgroundColor: peach,
    color: white,
  },
  activeText: {
    color: white,
  },
  addTag: {
    alignItems: "center",
    backgroundColor: peach,
    borderRadius: 50,
    color: white,
    padding: 5,
    shadowColor,
    width: 100,
 },
  body: {
    padding: 20
  },
  bottomButtons: {
    alignItems: "center",
    justifyContent: "flex-end",
    padding: 20,
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
  buttonDescription: {
  },
  buttonText: {
    color: black,
  },
  buttonValidate: {
  },
  container: { 
    backgroundColor: white,
    flex: 1,
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingTop: 50,
  },
  form: {
    flex: 1,
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
    alignSelf: "flex-end"
  },
  input: {
    borderColor: lightPeach,
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  tags: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  tagsSepator: {
    borderBottomColor: black,
    borderBottomWidth: 1,
    paddingBottom: 20,
 },
  tagsTitle: {
    color: black,
    marginBottom: 10,
 },
  toggleAnnouncement: {
    backgroundColor: peach,
  },
  toggleBase: {

    alignItems: "center",
    borderRadius: 20,
    marginBottom: 20,
    padding: 10,
  },
  toggleEvent: {
    backgroundColor: lightPeach,
  },
  toggleTextAnnouncement: {
    color: lightPeach,
  },
  toggleTextEvent: {
    color: peach,
  }
})
