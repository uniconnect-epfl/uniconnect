
import { StyleSheet } from 'react-native'
import { lightGray, peach } from '../../assets/colors/colors'

export const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: peach,
    borderRadius: 10,
    height: 200,
    margin: 10,
    overflow: 'hidden'
  },
  description: {
    color: lightGray,
    fontSize: 14,
  },
  image: {
    height: 80,
    width: '100%'
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

  
  