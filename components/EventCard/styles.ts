
import { StyleSheet } from 'react-native'
import { lightGray, peach, shadowColor} from '../../assets/colors/colors'

export const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: peach,
    borderRadius: 10,
    elevation: 5,
    margin: 10,
    overflow: 'hidden',
    shadowColor: shadowColor,
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  description: {
    color: lightGray,
    fontSize: 14,
  },
  image: {
    height: 100, // Set this to the aspect ratio of your image
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
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  // Add other styles as needed
})

  
  