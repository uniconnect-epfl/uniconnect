import { StyleSheet } from 'react-native' 
import { peach, lightPeach, shadowColor } from '../../../assets/colors/colors' 

import { BUTTON_RADIUS } from '../../../assets/global/constants' 
const styles = StyleSheet.create({
  absolute: {
    bottom: 0,
    position: 'absolute',
    width: '100%'
  },
  button: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: lightPeach,
    borderColor: peach,
    borderRadius: BUTTON_RADIUS,
    borderWidth: 3,
    display: 'flex',
    elevation: 8,
    height: 40,
    justifyContent: 'center',
    marginBottom: 60,
    marginTop: 35,
    shadowColor,
    shadowOffset: { width: 0, height: 2.5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    width: '60%',
  },
  container: {
    alignContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 40,
    marginVertical: 10
  },
  image: {
    alignSelf: 'center',
    height: 75,
    marginRight: 10,
    width: 75,
  },
  phrase: {
    display: 'flex',
    flexDirection: 'row',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingBottom: 10,
    textAlign: 'center',
  },
  view: {
    flex: 1
  }
}) 

export default styles 
