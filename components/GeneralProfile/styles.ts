import { StyleSheet } from 'react-native'
import { lightPeach, peach, shadowColor } from '../../assets/colors/colors'
import { BUTTON_RADIUS } from '../../assets/global/constants'

export const styles = StyleSheet.create({

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
        flexDirection: 'row',
        justifyContent: 'center',
        left: 10,
        margin: 10,
    },
    

    horizontalContainer: {
        flexDirection: 'row'
    },
    location: {
        fontSize: 11,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 5,
    },
    profilePicture: {
        alignItems: 'center',
        backgroundColor: peach,
        borderRadius: 40, // to make it circular
        height: 80,
        justifyContent: 'center',
        width: 80,
    },
    vertical: {
        flexDirection: 'column',
    },
})