import { View, Text } from "react-native"
import { styles } from "./styles"
import React from "react"
import { Announcement } from "../../types/Annoucements"

export interface AnnouncementCardProps {

    announcement: Announcement
    }

const AnnouncementCard = (
  {announcement} :{ announcement : AnnouncementCardProps}
) => {
  return (
    <View style={styles.cardContainer}>
      <Text style={styles.title}>
        {announcement.announcement.title}
      </Text>
        <Text style={styles.category}>
            {announcement.announcement.interests.join("- ")}
        </Text>
    </View>
  )
}

export default AnnouncementCard
