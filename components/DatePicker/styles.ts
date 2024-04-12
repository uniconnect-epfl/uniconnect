import { StyleSheet } from 'react-native';
import { lightPeach, white } from '../../assets/colors/colors';

const styles = StyleSheet.create({

  absView: {
    alignItems: 'center',
    height: '100%',
    justifyContent:'center',
    position: 'absolute',
    width: '100%',
  },
  container: {
    backgroundColor: lightPeach,
    flex: 1,
  },

  dateContainer: {
    backgroundColor: white,
    borderRadius: 10,

  },
  
});

export default styles;
