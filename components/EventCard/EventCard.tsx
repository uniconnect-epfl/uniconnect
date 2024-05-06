
import { styles } from "./styles"
import React , { View, Text }from "react-native"
import { Image } from "expo-image"
import { Event } from "../../types/Event"


const EventCard = (event : Event) => {

  const displayDate = event.date instanceof Date ? event.date.toLocaleDateString("en-US", {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) : 'Date not available'

  return (
    <View style={styles.cardContainer}>
      <Image source={event.imageUrl} style={styles.image}/>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{event.title}</Text>
        <Text>{displayDate}</Text>
        <View style={styles.locationContainer}>
          <Text style={styles.location}>{event.location + "  "}</Text>
        </View>
        <Text style={styles.description}>{event.description}</Text>
      </View>
    </View>
  )
}

export default EventCard
