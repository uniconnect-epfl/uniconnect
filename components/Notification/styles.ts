import { StyleSheet } from "react-native"
import { lightGray, lightPeach, black, peach } from "../../assets/colors/colors"

const styles = StyleSheet.create({
  activeTab: {
    fontSize: 16,

    fontWeight: "bold",
  },
  backIcon: {
    height: 24,
    marginRight: 16,
    width: 24,
  },
  container: {
    backgroundColor: lightPeach,
    flex: 1,
    padding: 16,
  },

  header: {
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
  },

  inactiveTab: {
    fontSize: 16,
    marginRight: 16,
  },

  message: {
    color: black,
    fontSize: 14,
  },
  name: {
    fontSize: 16,
  },
  notificationContainer: {
    alignItems: "center",
    backgroundColor: lightPeach,
    borderColor: peach,
    borderRadius: 50,
    borderWidth: 2,
    flexDirection: "row",
    marginBottom: 16,
  },
  placeholderCircle: {
    backgroundColor: peach,
    borderRadius: 25,
    height: 50,
    width: 50,
  },
  placeholderContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },

  profileImage: {
    borderRadius: 25,
    height: 50,
    marginRight: 16,
    width: 50,
  },

  searchInput: {
    borderColor: lightGray,
    borderRadius: 20,
    borderWidth: 1,
    height: 40,
    marginBottom: 16,
    paddingHorizontal: 16,
  },

  tabs: {
    flexDirection: "row",
    marginBottom: 16,
  },
  textContainer: {
    flex: 1,
  },
})

export default styles
