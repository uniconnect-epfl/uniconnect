import { StyleSheet } from 'react-native'
import { lightGray, lightPeach, peach, shadowColor} from '../../assets/colors/colors'

export const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: lightPeach,
        borderColor: peach,
        borderRadius: 10,
        borderWidth: 1,
        margin: 10,
        padding: 20,
        shadowColor: shadowColor,
        shadowOffset: {
            height: 2,
            width: 0,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    category: {
        color: lightGray,
        fontSize: 14,
        fontStyle: "italic",
        
    },
    recommended: {
        color: peach,
        fontSize: 14,
        fontStyle: "italic",
        marginTop: 5,
        textAlign: "right",
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    }
    
    
})