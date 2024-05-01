import { StyleSheet } from "react-native"
import { globalStyles } from "../../../assets/global/globalStyles"

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  profileName: {
    fontFamily: globalStyles.text.fontFamily,
    fontSize: 20,
    fontWeight: "bold",
  },
})

export default styles
