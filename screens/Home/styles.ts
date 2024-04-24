import { StyleSheet } from "react-native"
import { black, lightGray, lightPeach, shadowColor, white } from "../../assets/colors/colors"

export const styles = StyleSheet.create({
  containerEvent: {
    flex: 1,
  },
  eventList: {
    marginTop: 10,
    paddingLeft: 20,
  },
  input: {
    borderColor: lightGray,
    borderRadius: 40,
    borderWidth: 1,
    height: 60,
    margin: 20,
    padding: 10,
    width: '120%',
  }, 
  map: {
    alignItems: 'center',
    backgroundColor: lightPeach,
    borderRadius: 10,
    elevation: 2,
    justifyContent: 'center',
    marginLeft: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    shadowColor: shadowColor,
    shadowOffset: {
      height: 1,
      width: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  searchAndMap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingHorizontal: 10,
  },
  title: {
    color: black,
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 10,
    marginTop: 10,
  },
  view: {
    backgroundColor: white,
    flex: 1,
  },
})