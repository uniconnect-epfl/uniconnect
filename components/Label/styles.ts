import { StyleSheet } from "react-native"

import { peach } from "../../assets/colors/colors"

const styles = StyleSheet.create({
  buttonView: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "100%",
  },
  container: { 
    borderColor: peach,
    borderRadius: 10, 
    borderWidth: 1, 
    margin: 3, 
    padding: 5, 
  },
  text: {
    fontSize: 12,
  },
})

export default styles
