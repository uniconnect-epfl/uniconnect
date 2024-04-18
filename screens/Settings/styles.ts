import { StyleSheet } from "react-native"
import { black, white } from "../../assets/colors/colors"

export const styles = StyleSheet.create({
  backArrow: {
    color: black,
    fontSize: 24,
    marginRight: 10,
  },
  container: {
    backgroundColor: white,
    flex: 1,
  },
  header: {
    alignItems: "center",
    borderBottomWidth: 2,
    borderColor: black,
    flexDirection: "row",
    padding: 10,
  },
  headerTitle: {
    color: black,
    fontSize: 18,
  },
  menuItem: {
    borderBottomWidth: 1,
    borderColor: black,
    paddingLeft: 10,
    paddingVertical: 15,
  },
  menuItemText: {
    color: black,
    fontSize: 16,
  },
})