import React, { View, Text, Alert, TouchableOpacity } from 'react-native'
import { RouteProp, useRoute } from '@react-navigation/native'
import { Announcement } from '../../../types/Annoucements'
import { styles } from './styles'
import { viewDetailsStyles } from '../ViewDetailsStyles'
import { globalStyles } from '../../../assets/global/globalStyles'
import ProfilePicture from '../../../components/ProfilePicture/ProfilePicture'

type RootStackParamList = {
  ViewAnnouncementScreen: {
      announcement: Announcement;
  }
}

type ViewAnnoucementScreenRouteProps = RouteProp<RootStackParamList, "ViewAnnouncementScreen">

const ViewAnnoucementScreen = () => {
  const { announcement } = useRoute<ViewAnnoucementScreenRouteProps>().params

  return (
    <View style={styles.container}>
        <View style={viewDetailsStyles.topBackground} />
        <View style={viewDetailsStyles.detailsContainer}>

            <Text style={[
                    globalStyles.boldText, 
                    viewDetailsStyles.title,
                    viewDetailsStyles.detailsText
                ]}>
                {announcement.title}
            </Text>
            <Text style={[globalStyles.text, viewDetailsStyles.detailsText]}>
                {announcement.interests.join(" ")}
            </Text>

            <TouchableOpacity 
                style={viewDetailsStyles.profileContainer}
                onPress={() => {Alert.alert("Coming soon")}}>
                    <Text style={globalStyles.smallText}>By </Text>
                    <ProfilePicture
                        size={25}
                        pictureUrl=""
                    />
                    <Text style={globalStyles.smallText}> name surname</Text>
            </TouchableOpacity>

            <View style={viewDetailsStyles.separationBar}/>

            <Text style={[globalStyles.smallText, viewDetailsStyles.descriptionContainer]}>
                {announcement.description}
            </Text>
            
        </View>
    </View>
  )
}

export default ViewAnnoucementScreen