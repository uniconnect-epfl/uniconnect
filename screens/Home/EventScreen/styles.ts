import { StyleSheet } from "react-native"
import {
  lightPeach,
  peach,
  white,
} from "../../../assets/colors/colors"

export const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: peach,
    borderRadius: 40,
    color: lightPeach,
    justifyContent: "center",
    margin: "3%"
  },
  cardContainer: {
    flex: 1,
    padding: 10,
  },
  containerEvent: {
    flex: 1,
  },
  header: {
    fontSize: 18,
    textAlign: "left",
    textDecorationLine: 'underline'
  },
  iconText: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center"
  },
  map: {
    alignItems: "center",
    backgroundColor: lightPeach,
    borderColor: peach,
    borderRadius: 20,
    borderWidth: 3,
    height: 40,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  row: {
    flexDirection: 'row',
    
    justifyContent: 'space-evenly',
  },
  searchAndMap: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: "2.5%",
  },
  sectionHeader: {
    alignItems: "center",
    backgroundColor: white,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: "2.5%"
  },
  text: {
    fontFamily: "JetBrainsMono_400Regular",
    fontSize: 12,
    letterSpacing: -0.5,
    paddingRight: 3
  },
  transparent: {
    opacity: 0,  
   },
  view: {
    flex: 1,
  },
})
