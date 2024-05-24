import { StyleSheet } from "react-native"
import { black, lightPeach, peach } from "../../assets/colors/colors"

export const styles = StyleSheet.create({
  backArrow: {
    color: peach,
    fontSize: 24,
    marginRight: 10,
  },
  container: {
    backgroundColor: lightPeach,
    flex: 1,
  },
  firstMenuItem: {
    borderTopWidth: 0.75,
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 60,
    marginHorizontal: 20,
  },
  headerTitle: {
    color: black,
    fontSize: 18,
  },
  itemsContainer: {
    paddingHorizontal: 20
  },
  menuItem: {
    borderBottomWidth: 0.75,
    borderColor: black,
    paddingLeft: 10,
    paddingVertical: 15,
  },
  menuItemText: {
    color: peach,
    fontFamily: 'JetBrainsMono_400Regular',
    fontSize: 16,
  },
})