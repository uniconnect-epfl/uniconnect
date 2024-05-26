
import { Dimensions, StyleSheet } from 'react-native'
import { lightPeach, peach,} from '../../assets/colors/colors'


const { width: screenWidth, height: screenHeight } = Dimensions.get('window')

export const styles = StyleSheet.create({
  cardContainer: {
    
    backgroundColor: lightPeach,
    borderColor: peach,
    borderRadius: 10,
    borderWidth: 2,
    height: screenHeight * 0.26,  
    margin: 5,  
    overflow: 'hidden',
    width: screenWidth * 0.45,
  },
  detailsText: {
    fontSize: 12,
    marginLeft: 3
  },
  hostLabel: {
    alignItems: 'center',
    backgroundColor: lightPeach,
    borderColor: peach,
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: 'row',
    height: 20,
    justifyContent: 'center',
    left: 2,
    paddingHorizontal: 3,
    position: 'absolute',
    top: 2,
  },
  hostLabelText: {
    color: peach,
    fontSize: 10,
  },
  image: {
    backgroundColor: peach,
    height: "40%",
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
  participant: {
    paddingLeft: 2
  },
  participantList: {
    bottom: 4,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 5,
    position: "absolute",
    right: 4,
  },
  participationLabel: {
    alignItems: 'center',
    backgroundColor: lightPeach,
    borderColor: peach,
    borderRadius: 10,
    borderWidth: 1,
    height: 20,
    justifyContent: 'center',
    position: 'absolute',
    right: 2,
    top: 2,
    width: 20
  },
  textContainer: {
    borderBlockColor: peach,
    borderTopWidth: 1,
    flex: 1,
    padding: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  }
})

  
  