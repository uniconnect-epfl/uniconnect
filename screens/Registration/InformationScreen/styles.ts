import { StyleSheet } from 'react-native';
import {
  lightgray,
  peach,
  black,
  lightpeach,
} from '../../../assets/colors/colors';

const Styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: lightpeach,
    borderColor: peach,
    borderRadius: 25,
    borderWidth: 2,
    height: 50,
    justifyContent: 'center',
    marginTop: 100,
    width: '100%',
  },
  buttonText: {
    color: black,
    fontFamily: 'JetBrains-Mono',
  },
  container: {
    alignItems: 'baseline',
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 350,
  },

  image: {
    alignSelf: 'center',
    height: 75,
    marginRight: 10,
    width: 75,
  },

  input: {
    borderColor: lightgray,
    borderRadius: 25,
    borderWidth: 1,
    fontFamily: 'JetBrains-Mono',
    height: 50,
    marginVertical: 10,
    padding: 10,
    width: '100%',
  },
  topText: {
    color: black,
    flex: 1,
    flexDirection: 'row',
    fontFamily: 'JetBrains-Mono',
    justifyContent: 'flex-start',
    padding: 20,
    paddingBottom: 17,
  },

  // Additional styles for other elements can be added here
});

export default Styles;
