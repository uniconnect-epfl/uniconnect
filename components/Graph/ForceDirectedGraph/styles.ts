import { StyleSheet } from "react-native"
import { globalStyles } from "../../../assets/global/globalStyles"

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  nodeImage: {
    borderWidth: 3,
    position: "absolute",
    zIndex: 1,
  },
  profileName: {
    fontFamily: globalStyles.text.fontFamily,
    fontSize: 20,
    fontWeight: "bold",
  },
})

export default styles
