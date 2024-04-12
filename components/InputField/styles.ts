import { StyleSheet } from 'react-native' 
import { black, lightGray } from '../../assets/colors/colors' 

const styles = StyleSheet.create({
  
  input: {
    borderColor: lightGray,
    borderRadius: 25,
    borderWidth: 1,
    height: 50,
    paddingHorizontal: 30,
    width: '100%',
  },
  
  label: {
    color: black,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 10,
    paddingLeft: 20,
  },

  section: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
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
})

export default styles
