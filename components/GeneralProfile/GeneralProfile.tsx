import React from "react"
import { View, Text } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { styles } from "./styles"
import { black } from "../../assets/colors/colors"
import { globalStyles } from "../../assets/global/globalStyles"
import ProfilePicture from "../ProfilePicture/ProfilePicture"

interface GeneralProfileProps {
    name: string,
    surname: string,
    location: string,
    profilePictureUrl?: string,
}

const GeneralProfile: React.FC<GeneralProfileProps> = ({ 
    name,
    surname,
    location,
    profilePictureUrl = ""
}) => {

  return (
    <View style={styles.container}>

        <ProfilePicture
            size={85}
            pictureUrl={profilePictureUrl}
        />

        <Text style={globalStyles.boldText}>{name} {surname}</Text>

        <View style={styles.horizontalContainer}>
            <Ionicons name="location-outline" size={13} color={black} />
            <Text style={globalStyles.smallText}>{location}</Text>
        </View>

    </View>
  )
}

export default GeneralProfile
