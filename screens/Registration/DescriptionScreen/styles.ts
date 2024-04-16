import { StyleSheet } from "react-native"

import { white, peach, lightPeach } from "../../../assets/colors/colors"

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: white,
    flex: 1,
    justifyContent: "center",
  },

  description: {
    backgroundColor: lightPeach,
    borderColor: peach,
    borderRadius: 20,
    borderWidth: 3,
    fontSize: 18,
    height: "85%",
    marginHorizontal: 20,
    marginVertical: 20,
    padding: 20,
    paddingTop: 20,
    width: "90%",
  },

  title: {
    fontSize: 21,
  },
})

export default styles