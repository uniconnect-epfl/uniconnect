import { StyleSheet } from 'react-native';
import {
  peach,
  black,
  lightPeach,
  white,
  shadowColor,
} from '../../assets/colors/colors';

const styles = StyleSheet.create({
  buttonSmall: {
    alignItems: 'center',
    backgroundColor: lightPeach,
    borderColor: peach,
    borderRadius: 25,
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
  nextBar: {
    alignItems: 'center',
    backgroundColor: lightPeach,
    borderColor: peach,
    borderRadius: 25,
    borderWidth: 2,
    display: 'flex',
    flexDirection: 'row',
    height: 60,
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 10,
  },
});

export default styles;
