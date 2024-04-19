/* eslint-disable react/prop-types */

import React = require('react');
import { View, Text, Image } from 'react-native'
import { styles } from './styles'

interface EventCardProps {
  title: string;
  location: string;
  description: string;
  date: string;
  imageUrl: string; // Assuming you pass the URL of the PNG image here
}


const EventCard: React.FC<EventCardProps> = ({
  title,
  location,
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
        </View>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  )
}

export default EventCard
