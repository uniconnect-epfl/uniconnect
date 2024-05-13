import React, { View, Text, TouchableOpacity, Alert } from 'react-native'
import { RouteProp, useRoute } from '@react-navigation/native'
import { styles } from './styles'
import { Event } from '../../../types/Event'
import { useEffect, useState } from 'react'
import LoadingScreen from '../../Loading/LoadingScreen'
import { viewDetailsStyles } from '../ViewDetailsStyles'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { globalStyles } from '../../../assets/global/globalStyles'
import ProfilePicture from '../../../components/ProfilePicture/ProfilePicture'
import { getEventData } from '../../../firebase/ManageEvents'

type RootStackParamList = {
    ViewEvent: {
        // Here we're getting a uid and not an event because it is possible that the app opens on this screen (by QR)
        eventUid: string
    }
}
  
type ViewEventScreenRouteProps = RouteProp<RootStackParamList, "ViewEvent">

const ViewEventScreen = () => {
  const { eventUid } = useRoute<ViewEventScreenRouteProps>().params
  const [event, setEvent] = useState<Event | undefined>(undefined)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // getting the event from the database
    const fetchData = async () => {
      setLoading(true)
      if(eventUid){
        setEvent(await getEventData(eventUid)) // here we will need to fetch the event
      }
      setLoading(false)
    }
    fetchData()
  }, [eventUid])

  if(loading || !event){
    return <LoadingScreen/>
  }

  return (
    <View style={styles.container}>
        <View style={viewDetailsStyles.topBackground} />
        <View style={viewDetailsStyles.detailsContainer}>

            <Text style={[
                    globalStyles.boldText, 
                    viewDetailsStyles.title,
                    viewDetailsStyles.detailsText
                ]}>
                {event.title}
            </Text>
            <Text style={[globalStyles.text, viewDetailsStyles.detailsText]}>
                Travel - Holidays - Work
            </Text>
            <Text style={[globalStyles.smallText, viewDetailsStyles.detailsText]}>
                {event.date.toDateString()}
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

            <View style={styles.mapContainer}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: event.point.x,
                        longitude: event.point.y,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    }}
                    showsUserLocation
                    showsMyLocationButton
                    provider={PROVIDER_GOOGLE}
                >
                    <Marker
                        title={event.title}
                        coordinate={{
                            latitude: event.point.x,
                            longitude: event.point.y,
                        }}
                    />
                </MapView>
            </View>

            <Text style={[globalStyles.smallText, viewDetailsStyles.descriptionContainer]}>
                {event.description}
            </Text>
            
        </View>
    </View>
  )
}

export default ViewEventScreen