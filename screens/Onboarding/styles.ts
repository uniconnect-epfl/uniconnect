import { StyleSheet } from 'react-native';
import {
  white,
  black,
  blue,
  lightgray,
  lightpeach,
  peach,
  shadow,
} from '../../assets/colors/colors';

const styles = StyleSheet.create({
  border: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  button: {
    alignItems: 'center',
    backgroundColor: lightpeach,
    borderColor: peach,
    borderRadius: 25,
    borderWidth: 2,
    elevation: 8,
    height: 50,
    justifyContent: 'center',
    marginBottom: 10,
    shadowColor: shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    width: '100%',
  },
  buttonGoogle: {
    alignItems: 'center',
    backgroundColor: white,

    borderRadius: 25,
    borderWidth: 1,
    height: 50,
    justifyContent: 'center',
    shadowColor: shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    width: '100%',
  },

  buttonText: {
    color: black,
    fontSize: 18,
  },
  buttonTextGoogle: {
    color: black,
    fontSize: 18,
    fontWeight: 'bold',
  },
  container: {
    alignItems: 'center',
    flex: 1,
    gap: 1,
    justifyContent: 'center',
    padding: 20,
  },

  dividerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 20,
  },
  dividerLine: {
    backgroundColor: black,
    flex: 1,
    height: 1,
  },

  footer: {
    alignContent: 'flex-end',
    display: 'flex',
    flexDirection: 'row',
    height: 200,
    marginTop: 10,
    paddingTop: 160,
  },

  image: {
    height: 250,
    marginBottom: 10,
    marginRight: 30,
    width: 250,
  },

  inputField: {
    borderColor: lightgray,
    borderRadius: 25,
    borderWidth: 1,
    fontSize: 18,
    height: 50,
    marginBottom: 20,
    padding: 10,
    width: '100%',
  },

  logo: {
    borderColor: white,
    borderRadius: 1000,
    width: '100%',
  },

  signUpButton: {
    color: blue,
  },
  signUpContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  signUpText: {
    color: black,
    marginRight: 5,
  },

  smallText: {
    color: black,
    fontSize: 10,
    marginBottom: 20,
    textDecorationLine: 'underline',
  },

  specialText: {
    color: peach,
    fontSize: 10,
  },
});

export default styles;
