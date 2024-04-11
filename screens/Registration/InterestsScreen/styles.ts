import { StyleSheet } from 'react-native';
import {
  lightGray,
  peach,
  black,
  lightPeach,
  white,
  shadowColor,
} from '../../../assets/colors/colors';
import { BUTTON_HEIGHT, BUTTON_RADIUS } from '../../../assets/global/constants';

const styles = StyleSheet.create({
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
    backgroundColor: white,
    flex: 1,
  },

  footer: {
    width: '100%',
  },

  footerButton: {
    backgroundColor: white,
    borderRadius: BUTTON_RADIUS,
    paddingHorizontal: 30,
    paddingVertical: 15,
  },
  footerButtonText: {
    color: black,
    textAlign: 'center',
  },

  icon_container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 20,
    width: '100%',
  },

  image: {
    alignSelf: 'center',
    height: 75,
    marginRight: 10,
    width: 75,
  },

  input: {
    alignSelf: 'center',
    borderColor: lightGray,
    borderRadius: BUTTON_RADIUS,
    borderWidth: 1,
    height: BUTTON_HEIGHT,
    marginBottom: 25,
    paddingHorizontal: 30,
    width: '95%',
  },

  interestButton: {
    alignContent: 'center',
    borderColor: peach,
    borderRadius: 10,
    borderWidth: 2,
    display: 'flex',
    height: 110,
    justifyContent: 'center',
    marginBottom: 10,
    marginHorizontal: 10,
    padding: 10,
    width: 150,
  },

  interestText: {
    color: black,
    left: 0,
    right: 0,
    textAlign: 'center',
  },

  interestsGrid: {
    alignSelf: 'center',
  },

  selectedInterestButton: {
    backgroundColor: white,
    borderColor: lightGray,
    borderWidth: 2.5,
  },

  selectedInterestText: {
    color: lightGray,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingBottom: 10,
    textAlign: 'center',
  },
});
export default styles;
