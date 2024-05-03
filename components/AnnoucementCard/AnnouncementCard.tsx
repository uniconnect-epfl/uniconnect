import { View, Text } from "react-native"
import { styles } from "./styles"
import React from "react-native"
import { Announcement } from "../../types/Annoucements"


const AnnouncementCard = (announcement: Announcement) => {
  return (
    <View style={styles.cardContainer}>
      <Text style={styles.title}>
        {announcement.title}
      </Text>
        <Text style={styles.category}>
            {announcement.interests.join("- ")}
        </Text>
    </View>
  )
}

export default AnnouncementCard
