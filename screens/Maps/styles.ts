// MapStyles.ts
import { StyleSheet } from 'react-native'
import { white } from '../../assets/colors/colors'

export default StyleSheet.create({
	backButton: {
		
		backgroundColor: white, // Change as needed
		borderRadius: 5,
		left: 10,
		padding: 10,
		position: 'absolute',
		top: 10,
		zIndex: 10, // Make sure the button is above the map
	},
	calloutTextLocation: {
        fontSize: 14,
    },
	calloutTextTitle: {
        fontSize: 16,
    },
	calloutView: {
        padding: 10,
    },
	
    container: {
        flex: 1,
    },
	map: {
		flex: 1,
		height: '100%',
		width: '100%'
	}
    
    
   
})
