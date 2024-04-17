import { StyleSheet } from 'react-native' 
import { peach, lightGray, lightPeach, black } from '../../assets/colors/colors' 

export const styles = StyleSheet.create({
    cardContainer: {
        alignItems: 'center',
        backgroundColor: lightPeach,
        borderColor: peach,
        borderRadius: 100,
        borderWidth: 2,
        flexDirection: 'row',
        height: 80,
        marginHorizontal: 16,
        marginVertical: 8,
        paddingLeft: 85,
        paddingRight: 20,
    },
    contactDescription: {
        flex: 1,
        fontSize: 9,
        fontStyle: 'italic',
        position: 'absolute',
        textAlignVertical: 'center',
        top: `${5}%`,
    },
    contactFriendType: {
        flex: 1,
        fontSize: 12,
        position: 'absolute',
        top: `${78}%`
    },
    contactList: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    contactName: {
        flex: 1,
        fontSize: 18,
        fontWeight: 'bold',
        position: 'absolute',
        top: `${50}%`,
    },
    container: {
        flex: 1,
    },
    profilePicture: {
        alignItems: 'center',
        borderColor: peach,
        borderRadius: 40,
        borderWidth: 2,
        height: 80,
        justifyContent: 'center',
        // this is needed to make the border of the profile picture and the botder of the contact overlap
        left: -2,
        marginRight: 100,
        position: 'absolute',
        width: 80,
    },
    searchBar: {
        borderColor: lightGray,
        borderRadius: 40,
        borderWidth: 1,
        height: 60,
        margin: 20,
        padding: 10,
    }, 
    separationBar: {
        backgroundColor: black,
        borderRadius: 1,
        height: 1.5,
        marginHorizontal: 20,
        marginTop: 8,
    },
})
  