import { StyleSheet } from "react-native"
import { black, lightPeach, peach } from "../../../assets/colors/colors"

export const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: lightPeach,
    borderColor: peach,
    borderRadius: 10,
    borderWidth: 2,
    height: 38,
    justifyContent: "center",
    marginLeft: 14,
    width: 90,
  },
  buttonText: {
    alignItems: "center",
    fontSize: 12,
    fontWeight: "bold",
    justifyContent: "center",
    margin: 1,
  },
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  descriptionStyle: {
    width: "100%"
  },
  horizontalContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  leftAlign: {
    alignSelf: "flex-start",
    flex: 1,
  },
  profileContainer: {
    flex: 1,
    marginTop: -44,
    padding: 10,
  },

  separatorLine: {
    backgroundColor: black,
    height: 1,
    width: "auto",
  },
  topBackground: {
    backgroundColor: lightPeach,
    height: 160,
    width: "100%"
  },
  
})