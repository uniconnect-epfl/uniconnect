import { StyleSheet } from 'react-native'
import { black, lightGray, lightPeach, peach, shadowColor} from '../../../assets/colors/colors'

export const styles = StyleSheet.create({
  button :{
    alignItems: 'center',
    backgroundColor: peach,
    borderRadius: 40,
    color: lightPeach,
    
    
    display: 'flex',
    
    justifyContent: 'center',
    margin: "3%",
    shadowColor: shadowColor,
    shadowOffset: { height: 3, width: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 1.5,
  },

  containerEvent: {
    flex: 1,
    
  },
  header: { // A soft, inviting color
    borderRadius: 10,            // Rounded corners for a friendly look
    color: black,
    elevation: 3,               // White text for contrast
    fontSize: 20,               // A reasonable font size for headers
    fontWeight: 'bold', 
    margin: "3%",               // A bold font weight for emphasis
              
    
    textAlign: 'left',              
  },

  input: {
    borderColor: lightGray,
    borderRadius: 40,
    borderWidth: 1,
    height: 60,
    margin: "3%",
    padding: 20,
    width: '70%',
      // Note: Exceeding 100% can lead to layout overflow
  },
  map: {
    
    alignItems: 'center',
    backgroundColor: lightPeach,
    borderColor: peach,
    borderRadius: 40,
    borderWidth: 2,
    fontWeight: 'bold',
    height: 60,
   
    marginTop: 10, 
    
    paddingHorizontal: 5,
    paddingVertical: 20,
    shadowColor: shadowColor,

    shadowOffset: { height: 3, width: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 1.5,
    width: '100%',
    
    
  },
  searchAndMap: {
    flexDirection: 'row',
    justifyContent: 'center',
    
  },
  separationBar: {
    backgroundColor: black,
    borderRadius: 1,
    height: 1,
    marginLeft: "3%",
    marginRight: "50%",
    
   
  },
  title: {
    color: black,
    fontSize: 20,
    fontWeight: 'bold',
  },
  view: {
    flex: 1,
  },
})
