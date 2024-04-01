import { StyleSheet } from 'react-native';
import { peach, black, lightgray, transparent, lightpeach } from '../../assets/colors/colors';

export const styles = StyleSheet.create({
    cardContainer: {
        alignItems: 'center',
        backgroundColor: lightpeach,
        borderColor: peach,
        borderRadius: 100,
        borderWidth: 2,
        flexDirection: 'row',
        height: 80,
        marginHorizontal: 16,
        marginVertical: 8,
        paddingLeft: 85,
        paddingRight: 5,
    },
    container: {
        flex: 1,
    },
    description: {
        flex: 1,
        fontSize: 10,
        fontStyle: 'italic',
        textAlignVertical: 'center'
    },
    friendType: {
        flex: 1,
        fontSize: 12,
        fontStyle: 'italic',
    },
    horizontalContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
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
        justifyContent: 'center',
    },
    logo: {
        height: 70, 
        resizeMode: 'contain',
        width: 70,
    },
    name: {
        color: black,
        fontSize: 18,
        fontWeight: 'bold',
    },
    normalTabText: {
        alignItems: 'center',
        color: lightgray,
        justifyContent: 'center',
    },
    profilePicture: {
        borderColor: peach,
        borderRadius: 40,
        borderWidth: 2,
        height: 80,
        left: -2,
        marginRight: 100,
        position: 'absolute',
        width: 80,
    },
    searchBar: {
        borderColor: lightgray,
        borderRadius: 40,
        borderWidth: 1,
        height: 60,
        margin: 20,
        padding: 10,
    },
    selectedTabText: {
        color: black,
        fontWeight: 'bold',
    },
    spacer: {
        width: 50,
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    underline: {
        backgroundColor: transparent,
        borderRadius: 4,
        height: 4,
        width: 80,
    },
    underlineVisible: {
        backgroundColor: peach,
    },
    viewChoiceContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 95,
    },
})
  