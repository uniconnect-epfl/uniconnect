import { StyleSheet } from 'react-native'
import { peach } from '../../assets/colors/colors'

export const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
    },
    horizontalContainer: {
        flexDirection: 'row'
    },
    location: {
        fontSize: 11,
    },
    name: {
        fontSize: 13,
        fontWeight: 'bold',
    },
    profilePicture: {
        alignItems: 'center',
        backgroundColor: peach,
        borderRadius: 40, // to make it circular
        height: 80,
        justifyContent: 'center',
        width: 80,
    },

})