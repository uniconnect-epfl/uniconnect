import { StyleSheet } from "react-native"
import { lightPeach, peach } from "../../../assets/colors/colors"

export const styles = StyleSheet.create({
  cardContainer: {
    alignSelf: "center",
    backgroundColor: lightPeach,
    borderColor: peach,
    borderRadius: 100,
    height: 80,
    justifyContent: "center",
    marginBottom: 10,
    width: "100%",
  },
  container: {
    flex: 1,
    flexWrap: "nowrap",
  },
  informationsContainer: {
    borderColor: peach,
    borderRadius: 100,
    borderWidth: 3,
    flexDirection: "column-reverse",
    height: "100%",
    paddingBottom: 10,
    paddingLeft: 90,
    width: "100%",
  },
  listContainer: {
    alignSelf: "center",
    flex: 1,
    marginBottom: 10,
    width: "90%",
    zIndex: 1,
  },
  loadingScreen: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: lightPeach,
    borderColor: peach,
    borderRadius: 40,
    borderWidth: 3,
    height: "82.15%",
    justifyContent: "center",
    marginTop: 110,
    overflow: "hidden",
    position: "absolute",
    width: "90%",
    zIndex: 2,
  },

  nofriends: {
    height: "100%",
    resizeMode: "contain",
    width: "100%",
  },
  profilePicture: {
    alignItems: "center",
    borderColor: peach,
    borderRadius: 100,
    borderWidth: 2,
    height: 80,
    justifyContent: "center",
    position: "absolute",
    width: 80,
  },
})
