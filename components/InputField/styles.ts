import { StyleSheet } from "react-native"
import { black, lightGray } from "../../assets/colors/colors"

const styles = StyleSheet.create({
  input: {
    borderColor: lightGray,
    borderRadius: 25,
    borderWidth: 1,
    height: 50,
    margin: 10,
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

  section: {
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
    justifyContent: "center",
    maxHeight: 70,
    paddingHorizontal: 20,
  },
})

export default styles
