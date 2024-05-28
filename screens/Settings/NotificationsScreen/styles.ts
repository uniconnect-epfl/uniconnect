import { StyleSheet } from "react-native"
import {
  gray,
  lightGray,
  lightPeach,
  peach,
  white,
} from "../../../assets/colors/colors"

const styles = StyleSheet.create({
  backButton: {
    left: 10,
    position: "absolute",
    top: 20,
  },
  backButtonText: {
    color: lightPeach,
    fontSize: 24,
  },

  container: {
    backgroundColor: white,
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },

  headerText: {
    fontSize: 24,
    marginVertical: 20,
    textAlign: "center",
  },

  messageContainer: {
    backgroundColor: lightPeach,
    borderColor: peach,
    borderRadius: 35,
    borderWidth: 2,
    flexDirection: "row",
    marginBottom: 10,
  },
  messageContent: {
    flex: 1,
  },
  messageText: {
    color: gray,
  },

  nameText: {
    fontSize: 16,
    fontWeight: "bold",
  },

  profileImage: {
    backgroundColor: peach,
    borderRadius: 50,
    height: 50,
    marginRight: 10,
    width: 50,
  },

  searchInput: {
    borderColor: lightGray,
    borderRadius: 20,
    borderWidth: 1,
    height: 50,
    marginBottom: 20,
    paddingLeft: 20,
  },
})

export default styles
