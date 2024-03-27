import { StyleSheet } from 'react-native';
import { white, peach, black, lightgray } from '../../assets/colors/colors';

export const styles = StyleSheet.create({
    cardContainer: {
        alignItems: 'center',
        backgroundColor: white,
        borderColor: peach,
        borderRadius: 30,
        borderWidth: 1,
        flexDirection: 'row',
        marginHorizontal: 16,
        marginVertical: 8,
        padding: 5,
    },
    description: {
        fontStyle: 'italic',
    },
    image: {
        borderRadius: 35, // Circular image
        borderWidth: 3,
        height: 70,
        marginRight: 10,
        width: 70,
      },
    list: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    },
    loremText: {
        color: black,
        fontSize: 12,
    },
    name: {
        color: black,
        fontSize: 24,
        fontWeight: 'bold',
    },
    profilePcture: {
        borderColor: lightgray,
        borderRadius: 35,
        borderWidth: 1,
        height: 70,
        marginRight: 10,
        width: 70,
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
    },
})
  