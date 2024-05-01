import { View, Text, Image, TouchableOpacity } from "react-native"
import { styles } from "./styles"
import React from "react"

export interface EventCardProps {
  uid: string
  title: string
  location: string
  latitude: number
  longitude: number
  description: string
  date: string
  imageUrl: string // Assuming you pass the URL of the PNG image here
}

const EventCard = (
  {eventCard} :{ eventCard : EventCardProps}, onEventPress: (uid: string) => void
) => {
  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity onPress={() => onEventPress(eventCard.uid)}>
      <Image source={{ uri: eventCard.imageUrl }} style={styles.image}/>
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{eventCard.title}</Text>
        <Text>{eventCard.date}</Text>
        <View style={styles.locationContainer}>
          <Text style={styles.location}>{eventCard.location +  "  "}</Text>
          <Text>{Number(eventCard.latitude).toFixed(2) + "  "}</Text>
          <Text>{Number(eventCard.longitude).toFixed(2)}</Text>
        </View>
        <Text style={styles.description}>{eventCard.description}</Text>
      </View>
    </View>
  )
}

export default EventCard
