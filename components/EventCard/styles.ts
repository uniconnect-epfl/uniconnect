
import { StyleSheet } from 'react-native'
import { lightGray, lightPeach, peach, shadowColor} from '../../assets/colors/colors'

export const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: lightPeach,
    borderColor: peach,
    borderRadius: 10,
    borderWidth: 2,
    flex: 1,
    height: 202,
    margin: 5,
    overflow: 'hidden',
    
    shadowColor: shadowColor,
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width: 172,
    
  },
  description: {
    
    color: lightGray,
    fontSize: 14,
    fontStyle: 'italic',
    textAlign: 'right',
  },
  image: {
    backgroundColor: peach,
    height: 80,
    resizeMode: 'cover',
    width: '100%',
  },
  location: {
    marginLeft: 5,
  },
  locationContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 5,
  },
  textContainer: {
    borderBlockColor: peach,
    borderTopWidth: 1,
    padding: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  // Add other styles as needed
})

  
  