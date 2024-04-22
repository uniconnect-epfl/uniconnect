import React from "react"
import { View, Image, Text } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { styles } from "./styles"
import { black } from "../../assets/colors/colors"
import { globalStyles } from "../../assets/global/globalStyles"

interface GeneralProfileProps {
    name: string,
    surname: string,
    location: string
}

const GeneralProfile: React.FC<GeneralProfileProps> = ({ 
    name,
    surname,
    location
}) => {
  const profilePictureUrl = ""

  return (
    <View style={styles.container}>

        {profilePictureUrl ? (
            <Image
                style={styles.profilePicture}
                source={{ uri: profilePictureUrl }}
            />
        ) : (
            <View style={styles.profilePicture}>
                <Ionicons name="person" size={45} color={black} />
            </View>
        )}

        <Text style={globalStyles.boldText}>{name} {surname}</Text>

        <View style={styles.horizontalContainer}>
            <Ionicons name="location-outline" size={13} color={black} />
            <Text style={globalStyles.smallText}>{location}</Text>
        </View>

    </View>
  )
}

export default GeneralProfile
