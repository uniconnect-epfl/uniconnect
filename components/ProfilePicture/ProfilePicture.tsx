import { Ionicons } from "@expo/vector-icons"
import React, {View, Image} from "react-native"
import { black } from "../../assets/colors/colors"
import { styles } from "./styles"

interface ProfilePictureProps {
  size: number
  pictureUrl: string
}

const ProfilePicture = ({ size, pictureUrl }: ProfilePictureProps) => {
  return (
    <View>
        {pictureUrl ? (
            <Image
              style={[styles.profilePicture, {width: size, height: size}]}
              source={{ uri: pictureUrl }}
            />
        ) : (
            <View style={[styles.profilePicture, {width: size, height: size}]}>
              <Ionicons name="person" size={0.7 * size} color={black} />
            </View>
        )}
    </View>
  )
}

export default ProfilePicture
