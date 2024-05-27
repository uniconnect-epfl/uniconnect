
import { styles } from "./styles"
import React , { View, Text }from "react-native"
import { Image } from "expo-image"
import { Event } from "../../types/Event"
import { Ionicons } from "@expo/vector-icons"
import { peach } from "../../assets/colors/colors"
import { globalStyles } from "../../assets/global/globalStyles"
import ProfilePicture from "../ProfilePicture/ProfilePicture"
import { useContext } from "react"
import { RegistrationContext } from "../../contexts/RegistrationContext"

interface EventCardProps {
  event: Event
  userImages: Record<string, string>
}


const EventCard = ({event, userImages} : EventCardProps) => {

  const displayDate =  new Date(event.date as string).toLocaleDateString("en-US", {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
  const { user } = useContext(RegistrationContext)
  const isHost = event.host === user?.uid
  const participates = event.participants && user && event.participants.includes(user.uid)

  return (
    <View style={styles.cardContainer}>
      <Image source={event.imageUrl} style={styles.image}/>
      {participates &&
        <View style={styles.participationLabel}>
          <Ionicons name="checkmark-outline" size={18} color={peach}/>
        </View>
      }
      {isHost &&
        <View style={styles.hostLabel}>
          <Text style={[globalStyles.boldText, styles.hostLabelText]}>Hosted by you</Text>
        </View>
      }
      <View style={styles.textContainer}>
        <Text numberOfLines={3} style={[globalStyles.boldText, styles.title]}>{event.title}</Text>
        <View style={styles.locationContainer}>
          <Ionicons name="calendar-outline"/>
          <Text style={[globalStyles.text, styles.detailsText]}>{displayDate}</Text>
        </View>
        <View style={styles.locationContainer}>
          <Ionicons name="location-outline"/>
          <Text style={[globalStyles.text, styles.detailsText]}>{event.location}</Text>
        </View>
        <View style={styles.participantList}>
          {event.participants && event.participants.map((participant) => (
            <View key={participant} style={styles.participant}>
              <ProfilePicture size={15} pictureUrl={userImages[participant]}/>
            </View>
          ))}
        </View>
      </View>
    </View>
  )
}

export default EventCard
