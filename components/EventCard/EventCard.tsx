
import { View, Text, Image } from 'react-native'
import { styles } from './styles'
import React from 'react'

export interface EventCardProps {
  title: string;
  location: string;
  latitude: number;
  longitude: number;
  description: string;
  date: string;
  imageUrl: string; // Assuming you pass the URL of the PNG image here
}


const EventCard: React.FC<EventCardProps> = ({
  title,
  location,
  latitude,
  longitude,
  description,
  date,
  imageUrl,
}) => {
  return (
    <View style={styles.cardContainer}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text>{date}</Text>
        <View style={styles.locationContainer}>
          <Text style={styles.location}>{location}</Text>
          <Text>{latitude}</Text>
          <Text>{longitude}</Text>
        </View>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  )
}

export default EventCard
