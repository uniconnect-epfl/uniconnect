import React from "react"
import { View, Text, Image } from "react-native"
import styles from "./styles"
import { globalStyles } from "../../assets/global/globalStyles"

export interface NotificationProps {
  name: string
  id: string
  profileImage?: string // Use `require` to import images
}

const Notification: React.FC<NotificationProps> = ({ name, profileImage }) => {
  return (
    <View style={styles.notificationContainer}>
      <View style={styles.placeholderContainer}>
        {profileImage ? (
          <Image
            source={{ uri: profileImage }}
            style={styles.profileImage}
            testID="image"
          />
        ) : (
          <View style={styles.placeholderCircle} testID="placeholder" />
        )}
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.name, globalStyles.text]}>{name}</Text>
        <Text style={[styles.message, globalStyles.text]}>
          Added you as a friend{" "}
        </Text>
      </View>
    </View>
  )
}

export default Notification
