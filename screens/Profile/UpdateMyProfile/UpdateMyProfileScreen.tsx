import React, { useState } from "react"
import { View, Text, Image, Pressable, ActivityIndicator } from "react-native"
import { styles } from "./styles"
import { RouteProp, useRoute } from "@react-navigation/native"
import { User } from "../../../types/User"
import { launchImageLibraryAsync, MediaTypeOptions } from 'expo-image-picker'
import { updateUserImage, uploadUserImageToStorage } from "../../../firebase/User"
import { peach } from "../../../assets/colors/colors"

type RootStackParamList = {
  UpdateProfile: {
      user: User
  }
}

type MapScreenRouteProp = RouteProp<RootStackParamList, 'UpdateProfile'>;

export const UpdateMyProfileScreen = () => {
  const route = useRoute<MapScreenRouteProp>()
  const user = route.params.user
  const [image, setImage] = useState(user.profilePicture)
  const [loading, setLoading] = useState(false)

  const pickImage = async () => {
    const result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    })

    if (!result.canceled) {
      setLoading(true)
      const url = await uploadUserImageToStorage(user.uid, result.assets[0].uri)
      if (url) {
        await updateUserImage(user.uid, url)
        setImage(url)
      }
      setTimeout(() => setLoading(false), 500)
    }
  }

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{uri: image}}/>
      {loading && <ActivityIndicator size="large" color={peach} />}
      {!loading &&
        <Pressable onPress={pickImage}>
          <Text>Update my profile picture</Text>
        </Pressable>
      }
    </View>
  )
}
