import { StyleSheet, StatusBar  } from 'react-native';
import {
  lightgray,
  peach,
  black,
  lightpeach,
  shadow,
  white
} from '../../../assets/colors/colors';

const Styles = StyleSheet.create({
  barContainer: {},

  button: {
    alignItems: 'center',
    backgroundColor: lightpeach,
    borderColor: peach,
    borderRadius: 25,
    borderWidth: 2,
    elevation: 8, //
    height: 50,
    justifyContent: 'center',
    marginHorizontal: 30,
    shadowColor: shadow,
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
    justifyContent: 'center',
    padding: StatusBar.currentHeight,
  },

  divider: {
    backgroundColor: black,
    height: 1,
    marginHorizontal: 20,
    marginVertical: 20,
    width: 'auto',
  },

  icon: {
    height: 20,
    width: 20,
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
    backgroundColor: lightpeach,
    borderColor: peach,
    borderRadius: 25,
    borderWidth: 2,
    display: 'flex',
    flexDirection: 'row',
    height: 60,
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 100,
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
    paddingBottom: 65,
  },

  topText: {
    color: black,
    flex: 1,
    flexDirection: 'row',
    fontFamily: 'JetBrains-Mono',
    justifyContent: 'flex-start',
    padding: 20,
    paddingBottom: 25,
    paddingTop: 50,
  },
});

export default Styles;
