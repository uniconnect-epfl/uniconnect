import { StyleSheet } from "react-native"

import { peach } from "../../assets/colors/colors"

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    borderColor: peach,
    borderRadius: 20,
    borderWidth: 2,
    display: "flex",
    flexDirection: "row",
    margin: 3,
    padding: 3,
    width: "30%",
  },
  text: {
    fontSize: 8,
  },
})

export default styles
