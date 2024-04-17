import { StyleSheet } from 'react-native'
import { peach, lightPeach, shadowColor, white} from '../../../assets/colors/colors'


import { BUTTON_RADIUS } from '../../../assets/global/constants' 
export const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: lightPeach,
    borderColor: peach,
    borderRadius: BUTTON_RADIUS,
    borderWidth: 3,
    display: 'flex',
    elevation: 8,
    height: 40,
    justifyContent: 'center',
    marginBottom: 60,
    marginTop: 35,
    shadowColor,
    shadowOffset: { width: 0, height: 2.5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    width: '60%',
  },

  eventItem: {
    backgroundColor: white,
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 5,
    padding: 10
  }, 
  
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',

    paddingHorizontal: 10,
    paddingTop: 50, // Adjust the padding to suit your header's design
    
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    // ...additional styles for your header title if needed
  },

  leftAlign: {
    alignSelf: 'flex-start'
  },
  view: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  

  
})