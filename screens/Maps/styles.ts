/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/sort-styles */
// MapStyles.ts
import { StyleSheet } from "react-native"
import { white } from "../../assets/colors/colors"

export default StyleSheet.create({
  calloutTextLocation: {
    fontSize: 14,
  },
  calloutTextTitle: {
    fontSize: 16,
  },
  calloutView: {
    padding: 10,
  },

  container: {
    flex: 1,
  },
  map: {
    flex: 1,
    height: "100%",
    width: "100%",
  },
  navigationBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "center",
    paddingTop: 10,
    height: 80,
    width: "100%",
    // Include other styling such as background color, height, etc.
  },
  backButton: {
    marginRight: 10, // Provide some spacing between the back button and the title
  },
  screenTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    // Include other styling as needed for the screen title
  },

})
