import { StyleSheet } from 'react-native';
import {
  lightgray,
  peach,
  black,
  lightpeach,
} from '../../../assets/colors/colors';
import { StatusBar } from 'react-native';

const Styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: lightpeach,
    borderColor: peach,
    borderRadius: 25,
    borderWidth: 2,
    height: 50,
    justifyContent: 'center',
    width: '100%',
  },

  buttonContainer: {
    marginHorizontal: 20,
    marginVertical: 10,
  },

  buttonText: {
    color: black,
    fontFamily: 'JetBrains-Mono',
  },
  container: {
    justifyContent: 'center',
    padding: StatusBar.currentHeight,
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
    marginTop: 30,
    width: 75,
  },

  input: {
    borderColor: lightgray,
    borderRadius: 25,
    borderWidth: 1,
    fontFamily: 'JetBrains-Mono',
    height: 50,
    paddingHorizontal: 30,
    width: '100%',
  },
  locationButton: {
    height: 25,
    marginBottom: 50,
    width: 170,
  },

  locationText: {
    alignSelf: 'baseline',
    paddingLeft: 10,
  },

  section: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: 5,
    paddingBottom: 75,
    paddingHorizontal: 20,
    paddingTop: 10,
    width: '100%',
  },

  sectionFirst: {
    paddingTop: 60,
  },

  sectionLast: {
    paddingBottom: 50,
  },

  topText: {
    color: black,
    flex: 1,
    flexDirection: 'row',
    fontFamily: 'JetBrains-Mono',
    justifyContent: 'flex-start',
    padding: 20,
    paddingBottom: 25,
  },
});

export default Styles;
