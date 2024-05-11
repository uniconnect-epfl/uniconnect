
import { Dimensions, StyleSheet } from 'react-native'
import { lightPeach, peach,} from '../../assets/colors/colors'
import { globalStyles } from '../../assets/global/globalStyles'


const { width: screenWidth, height: screenHeight } = Dimensions.get('window')

export const styles = StyleSheet.create({
  cardContainer: {
    
    backgroundColor: lightPeach,
    borderColor: peach,
    borderRadius: 10,
    borderWidth: 2,
    height: screenHeight * 0.24,  
    margin: 5,  
    overflow: 'hidden',
    width: screenWidth * 0.435,
  },
  description: {
    
    ...globalStyles.description,
  },
  image: {
    backgroundColor: peach,
    height: "45%",
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
    flex: 1,
    padding: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  // Add other styles as needed
})

  
  