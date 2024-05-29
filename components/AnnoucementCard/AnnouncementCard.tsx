
import { styles } from "./styles"
import React, { View, Text } from "react-native"
import { Announcement } from "../../types/Annoucement"
interface AnnouncementCardProps {
  announcement: Announcement
  recommended?: boolean
}
// an annoucement is recommaded if it has the 3 tags matching the user's interests
const AnnouncementCard = ({announcement, recommended} : AnnouncementCardProps) => {
  return (
    <View style={styles.cardContainer}>
      <Text style={styles.title}>
        {announcement.title}
      </Text>

      <Text style={styles.category}>
        {announcement.interests.join("- ")}
      </Text>

      {recommended && (
        <Text style={styles.recommended}>Matches all your interests ★</Text>
      )}
    </View>
  )
}

export default AnnouncementCard
