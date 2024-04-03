import { StyleSheet } from 'react-native';
import { black, lightGray } from '../../assets/colors/colors';

const styles = StyleSheet.create({
  input: {
    borderColor: lightGray,
    borderRadius: 25,
    borderWidth: 1,
    height: 50,
    paddingHorizontal: 30,
    width: '100%',
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
    justifyContent: 'flex-start',
    padding: 20,
    paddingBottom: 20,
    paddingTop: 50,
  },
});

export default styles;
