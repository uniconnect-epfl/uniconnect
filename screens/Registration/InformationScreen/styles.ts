import { StyleSheet } from 'react-native';
import {
  peach,
  black,
  lightPeach,
  shadowColor,
  white,
} from '../../../assets/colors/colors';

import { BUTTON_HEIGHT, BUTTON_RADIUS } from '../../../assets/global/constants';

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: lightPeach,
    borderColor: peach,
    borderRadius: BUTTON_RADIUS,
    borderWidth: 2,
    elevation: 8, //
    height: BUTTON_HEIGHT,
    justifyContent: 'center',
    marginHorizontal: 30,
    shadowColor,
    shadowOffset: { width: 0, height: 2.5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    width: 'auto',
  },

  buttonContainer: {
    marginHorizontal: 20,
    marginVertical: 10,
  },

  buttonSmall: {
    alignItems: 'center',
    backgroundColor: lightPeach,
    borderColor: peach,
    borderRadius: BUTTON_RADIUS,
    borderWidth: 2,
    display: 'flex',
    elevation: 8,
    height: 40,
    justifyContent: 'center',
    marginHorizontal: 5,
    shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    width: 90,
  },

  buttonSmallLeft: {
    backgroundColor: peach,
  },

  buttonText: {
    color: black,
  },

  buttonTextLeft: {
    color: white,
  },

  container: {
    justifyContent: 'space-around',
  },
  date:{
    
  },
  description: {
    alignSelf: 'center',
    borderColor: peach,
    borderRadius: 10,
    borderWidth: 2,
    display: 'flex',
    flexDirection: 'column',
    height: '17%',
    justifyContent: 'space-between',
    padding: 5,
    width: '70%',
  },


 

  footer: {
    
    width: '100%',
  },

  image: {
    alignSelf: 'center',
    height: 75,
    marginRight: 10,
    width: 75,
  },

  locationButton: {
    display: 'flex',
    flexDirection: 'row',
    height: 25,
    marginBottom: 20,
    marginLeft: 20,
    width: 180,
  },

  locationText: {
    alignSelf: 'baseline',
    paddingLeft: 5,
  },

  nextBar: {
    alignItems: 'center',
    backgroundColor: lightPeach,
    borderColor: peach,
    borderRadius: BUTTON_RADIUS,
    borderWidth: 2,
    display: 'flex',
    flexDirection: 'row',
    height: 60,
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 100,
  },
});

export default styles;
