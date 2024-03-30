import { StyleSheet } from 'react-native';
import {
  lightgray,
  peach,
  black,
  lightpeach,
  white,
  shadow,
} from '../../../assets/colors/colors';

const styles = StyleSheet.create({
  buttonSmall: {
    alignItems: 'center',
    backgroundColor: lightpeach,
    borderColor: peach,
    borderRadius: 25,
    borderWidth: 2,
    display: 'flex',
    elevation: 8,
    height: 40,
    justifyContent: 'center',
    marginHorizontal: 5,
    shadowColor: shadow,
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
    fontFamily: 'JetBrains-Mono',
  },

  buttonTextLeft: {
    color: white,
    fontFamily: 'JetBrains-Mono',
  },

  container: {
    backgroundColor: white,
    flex: 1,
    padding: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerButton: {
    backgroundColor: white,
    borderRadius: 20,
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
    marginTop: 20,
    width: 75,
  },

  input: {
    borderColor: lightgray,
    borderRadius: 25,
    borderWidth: 1,
    fontFamily: 'JetBrains-Mono',
    height: 50,
    marginBottom: 25,
    paddingHorizontal: 30,
    width: '100%',
  },

  interestButton: {
    borderColor: peach,
    borderRadius: 10,
    borderWidth: 2,
    display: 'flex',
    height: 110,
    marginBottom: 10,
    padding: 10,
    width: 150,
  },

  interestText: {
    bottom: 0,
    color: black,
    fontFamily: 'JetBrains-Mono',
    left: 0,
    position: 'absolute',
    right: 0,
    textAlign: 'center',
    top: '50%',
  },

  interestsGrid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },

  nextBar: {
    alignItems: 'center',
    backgroundColor: lightpeach,
    borderColor: peach,
    borderRadius: 25,
    borderWidth: 2,
    display: 'flex',
    flexDirection: 'row',
    height: 60,
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },

  selectedInterestButton: {
    backgroundColor: white,
    borderColor: lightgray,
    borderWidth: 2.5,
  },

  selectedInterestText: {
    color: lightgray,
  },

  title: {
    fontFamily: 'JetBrains-Mono',
    fontSize: 24,
    fontWeight: 'bold',

    textAlign: 'center',
  },
});

export default styles;
