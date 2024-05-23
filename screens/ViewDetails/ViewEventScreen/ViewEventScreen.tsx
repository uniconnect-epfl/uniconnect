import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Alert } from 'react-native'
import { RouteProp, useRoute } from '@react-navigation/native'
import { styles } from './styles'
import { Event } from '../../../types/Event'
import LoadingScreen from '../../Loading/LoadingScreen'
import { viewDetailsStyles } from '../ViewDetailsStyles'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { globalStyles } from '../../../assets/global/globalStyles'
import ProfilePicture from '../../../components/ProfilePicture/ProfilePicture'
import { getEventData, updateEventData } from '../../../firebase/ManageEvents'
import { BackArrow } from '../../../components/BackArrow/BackArrow'
import { showErrorToast, showSuccessToast } from '../../../components/ToastMessage/toast'
import { updateUserEvents } from '../../../firebase/User'
import { User } from '../../../types/User'
import { getUserData } from '../../../firebase/User'
import { getAuth } from 'firebase/auth'

type RootStackParamList = {
    ViewEvent: {
        eventUid: string
    }
}

type ViewEventScreenRouteProps = RouteProp<RootStackParamList, "ViewEvent">

const ViewEventScreen = () => {
    const { eventUid } = useRoute<ViewEventScreenRouteProps>().params
    const [event, setEvent] = useState<Event | undefined>(undefined)
    const [loading, setLoading] = useState(true)
    const userId = getAuth().currentUser?.uid
    const [user, setUser] = useState<User | null>(null)
    const [dateInISO, setDateInISO] = useState<string | null>(null)
    const [host, setHost] = useState<User | null>(null)
    const [participating, setParticipating] = useState<boolean>(false)

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setLoading(true)
                if (userId) {
                    const fetchedUser = await getUserData(userId)
                    setUser(fetchedUser)
                    if (fetchedUser) {
                        setParticipating(fetchedUser.events.includes(eventUid))
                      }
                }
                setLoading(false)
            } catch (error) {
                showErrorToast("Error fetching user data. Please check your connection and try again.")
            }
        }
        fetchUserData()
    }, [userId])

    useEffect(() => {
        const fetchEventData = async () => {
            try {
                setLoading(true)
                if (eventUid) {
                    const fetchedEvent = await getEventData(eventUid)
                    setEvent(fetchedEvent)
                    if (fetchedEvent?.host) {
                        const fetchedHost = await getUserData(fetchedEvent.host)
                        setHost(fetchedHost)
                    }
                    if (fetchedEvent?.participants) {
                        //TODO after the layout of participants is decided
                        //setParticipants(fetchedEvent.participants)
                    }
                    const displayDate = new Date(fetchedEvent?.date as string).toLocaleDateString("en-US", {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })
                    setDateInISO(displayDate)
                }
                setLoading(false)
            } catch (error) {
                showErrorToast("Error fetching event data. Please check your connection and try again.")
            }
        }
        fetchEventData()
    }, [eventUid])


    const registerToEvent = async () => {
        if (!user || !event) {
            return
        }
        const userSuccess = await updateUserEvents(user.uid, eventUid)
        const eventSuccess = await updateEventData(eventUid, user.uid)
        if (userSuccess && eventSuccess) {
            setParticipating(!participating)
            showSuccessToast(
              participating
                ? "Successfully withdrawn from the event."
                : "Successfully registered to the event."
            )
        }
    }

    if (loading || !event || !dateInISO || !host) {
        return <LoadingScreen />
    }

    return (
        <View style={styles.container}>
            <View style={viewDetailsStyles.topBackground} />
            <BackArrow />

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
                    {dateInISO}
                </Text>

                <TouchableOpacity
                    style={viewDetailsStyles.profileContainer}
                    onPress={() => { Alert.alert("Coming soon") }}>
                    <Text style={globalStyles.smallText}> Hosted By </Text>
                    <ProfilePicture
                        size={25}
                        pictureUrl=""
                    />
                    <Text style={globalStyles.smallText} >{host.firstName} {host.lastName}</Text>
                </TouchableOpacity>

                <View style={viewDetailsStyles.separationBar} />
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
                {user?.uid !== event.host && (
                    <TouchableOpacity
                        key={participating ? "withdraw" : "participate"}
                        style={styles.participateButton}
                        onPress={registerToEvent}
                    >
                        <Text style={globalStyles.boldText}>
                            {participating ? "Withdraw" : "Participate"}
                            
                        </Text>
                    </TouchableOpacity>
                )}

                {user?.uid === event.host && (
                <TouchableOpacity
                    style={styles.participateButton}
                    onPress={() => Alert.alert("Coming soon")}
                >
                    <Text style={globalStyles.boldText}>Edit</Text>
                </TouchableOpacity>
                )    
                }
            </View>
        </View>
    )
}

export default ViewEventScreen
