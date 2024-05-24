import { StyleSheet } from "react-native"
import { peach, black, white } from "../../../assets/colors/colors"

const styles = StyleSheet.create({
  container: {
    backgroundColor: white,
    flex: 1,
    padding: 20,
  },

  interestButton: {
    alignContent: "center",
    borderColor: peach,
    borderRadius: 10,
    borderWidth: 2,
    display: "flex",
    height: 110,
    justifyContent: "center",
    marginBottom: 10,
    marginHorizontal: 10,
    padding: 10,
    width: 150,
  },

  interestText: {
    color: black,
    left: 0,
    right: 0,
    textAlign: "center",
  },

  interestsGrid: {
    alignSelf: "center",
    paddingTop: 5,
  },
})
export default styles
