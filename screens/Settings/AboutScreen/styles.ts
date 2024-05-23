import { StyleSheet } from "react-native"
import { lightPeach } from "../../../assets/colors/colors"

export const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: lightPeach,
    flex: 1,
    paddingBottom: 100,
  },

  image: {
    marginRight: 30,
  },
  textContainer: {
    paddingBottom: 40,
    paddingHorizontal: 20,
    paddingVertical: 20,
    textAlign: "center",
  },
  title: {
    fontSize: 30,
    paddingTop: 50,
  },
})
