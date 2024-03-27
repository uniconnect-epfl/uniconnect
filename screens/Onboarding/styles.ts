import { StyleSheet } from 'react-native';
import { white, red, black, blue} from '../../assets/colors/colors';

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: red,
    borderRadius: 25,
    height: 50,
    justifyContent: 'center',
    marginBottom: 10,
    width: '100%',
  },
  buttonGoogle: {
    alignItems: 'center',
    backgroundColor: white,
    borderRadius: 25,
    borderWidth: 1,
    height: 50,
    justifyContent: 'center',
    width: '100%',
  },
  buttonText: {
    color: white,
    fontSize: 18,
  },
  buttonTextGoogle: {
    color: black,
    fontSize: 18,
  },
  container: {
    alignItems: 'center',
    flex: 1,
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
  dividerText: {
    color: black,
    marginHorizontal: 10,
  },
  forgotPassword: {
    color: blue,
    marginBottom: 20,
  },
  image: {
    borderColor: black,
    borderWidth: 1,
    height: 250,
    marginBottom: 50,
    marginTop: 700,
    width: 250,
  },
  inputField: {
    borderWidth: 1,
    height: 50,
    marginBottom: 20,
    padding: 10,
    width: '100%',
  },
  logoPlaceholder: {
    backgroundColor: red,
    height: 100,
    marginBottom: 50,
    width: 100,

    // Just a placeholder. Replace with an Image component and your logo.
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
  }
});

export default styles;
