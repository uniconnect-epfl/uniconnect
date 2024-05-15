import { StyleSheet } from "react-native"
import { black, lightGray } from "../../assets/colors/colors"

const styles = StyleSheet.create({
  input: {
    borderColor: lightGray,
    borderRadius: 25,
    borderWidth: 1,
    height: 40,
    marginTop: 5,
    paddingHorizontal: 30,
    width: "100%",
  },
  label: {
    color: black,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingLeft: 20,
  },
  labelContainer: {
    width: "100%"
  },
  section: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    margin: 10,
    maxHeight: 70,
  },
})

export default styles
