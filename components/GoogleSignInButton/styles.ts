import { StyleSheet } from 'react-native' 
import {
  white,
  black,
  shadowColor,
} from '../../assets/colors/colors'
import {
  BUTTON_HEIGHT,
  BUTTON_RADIUS,
  BUTTON_TEXT_FONT_SIZE,
} from '../../assets/global/constants' 

const styles = StyleSheet.create({
  buttonGoogle: {
    alignItems: 'center',
    backgroundColor: white,
    borderRadius: BUTTON_RADIUS,
    borderWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    height: BUTTON_HEIGHT,
    justifyContent: 'flex-start',
    paddingLeft: 15,
    shadowColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    width: '100%',
  },

  buttonPlaceholder: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  buttonText: {
    color: black,
    fontSize: BUTTON_TEXT_FONT_SIZE,
  },
  icon: {
    paddingRight: 25,
  }
}) 

export default styles 
