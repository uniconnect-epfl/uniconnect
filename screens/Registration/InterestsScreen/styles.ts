import { StyleSheet } from 'react-native';
import {
  lightgray,
  peach,
  black,
  lightpeach,
  white,
} from '../../../assets/colors/colors';

const styles = StyleSheet.create({
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
    marginTop: 40,
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
    color: black,
    fontFamily: 'JetBrains-Mono',
    textAlign: 'center',
  },

  interestsGrid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },

  selectedInterestButton: {
    backgroundColor: lightpeach,
  },

  selectedInterestText: {
    color: white,
  },
  title: {
    fontFamily: 'JetBrains-Mono',
    fontSize: 24,
    fontWeight: 'bold',

    textAlign: 'center',
  },
});

export default styles;
