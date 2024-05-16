import React, { useEffect, useState } from "react"
import { View, Text, Image, Pressable, ActivityIndicator } from "react-native"
import { styles } from "./styles"
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native"
import { User } from "../../../types/User"
import { launchImageLibraryAsync, MediaTypeOptions } from 'expo-image-picker'
import { updateUserData, updateUserImage, uploadUserImageToStorage } from "../../../firebase/User"
import { peach } from "../../../assets/colors/colors"
import InputField from "../../../components/InputField/InputField"
import { showSuccessToast } from "../../../components/ToastMessage/toast"

type RootStackParamList = {
  UpdateProfile: {
      user: User
  }
}

type MapScreenRouteProp = RouteProp<RootStackParamList, 'UpdateProfile'>;

export const UpdateMyProfileScreen = () => {
  const route = useRoute<MapScreenRouteProp>()
  const navigation = useNavigation()
  const user = route.params.user
  const [image, setImage] = useState(user.profilePicture? user.profilePicture : "")
  const [imageLoading, setImageLoading] = useState(false)
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState(user.firstName)
  const [lastName, setLastName] = useState(user.lastName)
  const [location, setLocation] = useState(user.location)

  const pickImage = async () => {
    const result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    })

    if (!result.canceled) {
      setImageLoading(true)
      const url = await uploadUserImageToStorage(user.uid, result.assets[0].uri)
      if (url) {
        await updateUserImage(user.uid, url)
        setImage(url)
      }
      setTimeout(() => setImageLoading(false), 500)
    }
  }

  useEffect(() => {
    setLoading(true)
    // TODO: Later
    setLoading(false)
  }, [])

  const submitChanges = async () => {
    setLoading(true)
    const newData = {
      firstName: name,
      lastName: lastName,
      location: location
    }
    const success = await updateUserData(user.uid, newData)
    if(success) {
      showSuccessToast("Profile updated successfully!")
      navigation.goBack()
    }
    setLoading(false)
  }


  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{uri: image}}/>
      {imageLoading && <ActivityIndicator size="large" color={peach} />}
      {!imageLoading &&
        <Pressable onPress={pickImage}>
          <Text>Update my profile picture</Text>
        </Pressable>
      }
      {loading &&
        <Text>soon</Text>
      }
      <InputField
        label="First Name"
        value={name}
        onChangeText={setName}
      />
      <InputField
        label="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />
      <InputField
        label="Location"
        value={location}
        onChangeText={setLocation}
      />
      <Pressable onPress={submitChanges}>
          <Text>Submit changes</Text>
      </Pressable>
      <Text style={styles.text1}>soon</Text>
      <Text style={styles.text2}>soon</Text>
      <Text style={styles.text3}>soon</Text>
    </View>
  )
}
