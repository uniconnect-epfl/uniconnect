import { StyleSheet } from 'react-native'
import { peach } from '../../assets/colors/colors'

export const styles = StyleSheet.create({
    container: {
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

})