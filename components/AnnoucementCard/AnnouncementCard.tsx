
import { styles } from "./styles"
import React, { View, Text } from "react-native"
import { Announcement } from "../../types/Annoucement"


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
