import React, { useState } from "react"
import { View, Text, Pressable, ActivityIndicator, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from "react-native"
import { styles } from "./styles"
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native"
import { User } from "../../../types/User"
import { launchImageLibraryAsync, MediaTypeOptions } from 'expo-image-picker'
import { updateUserData, updateUserImage, uploadUserImageToStorage } from "../../../firebase/User"
import { peach } from "../../../assets/colors/colors"
import InputField from "../../../components/InputField/InputField"
import { showSuccessToast } from "../../../components/ToastMessage/toast"
import { Ionicons } from "@expo/vector-icons"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { globalStyles } from "../../../assets/global/globalStyles"
import ProfilePicture from "../../../components/ProfilePicture/ProfilePicture"
import useKeyboardVisibility from "../../../hooks/useKeyboardVisibility"
import { EditDescriptionModal } from "../../../components/EditDescriptionModal/EditDescriptionModal"

type RootStackParamList = {
  UpdateProfile: {
      user: User
      fetchData: () => void
  }
}

type MapScreenRouteProp = RouteProp<RootStackParamList, 'UpdateProfile'>;

export const UpdateMyProfileScreen = () => {
  const route = useRoute<MapScreenRouteProp>()
  const navigation = useNavigation()
  const insets = useSafeAreaInsets()
  const user = route.params.user
  const fetchData = route.params.fetchData
  const [image, setImage] = useState(user.profilePicture? user.profilePicture : "")
  const [imageLoading, setImageLoading] = useState(false)
  const [name, setName] = useState(user.firstName)
  const [lastName, setLastName] = useState(user.lastName)
  const [location, setLocation] = useState(user.location)
  const [description, setDescription] = useState(user.description)
  const keyboardVisible = useKeyboardVisibility()
  const [editDescription, setEditDescription] = useState(false)

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

  const submitChanges = async () => {
    const newData = {
      firstName: name,
      lastName: lastName,
      location: location,
      description: description
    }
    const success = await updateUserData(user.uid, newData)
    if(success) {
      fetchData()
      showSuccessToast("Profile updated successfully!")
      navigation.goBack()
    }
  }


  return (
    <>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={[styles.main, {paddingTop: insets.top + 5}]}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} testID="back-button">
              <Ionicons name="arrow-back-outline" size={24} color={peach} />
            </TouchableOpacity>
          </View>
          <View style={styles.container}>
            <View>
              <ProfilePicture
                pictureUrl={image}
                size={100}
              />
              <Pressable testID="update-profile-picture" style={styles.changePictureButton} onPress={pickImage}>
                <Ionicons name="create" size={26} color={peach} />
              </Pressable>
            </View>
            {imageLoading && <ActivityIndicator size="large" color={peach} style={styles.activityIndicator} />}
            <View style={styles.inputs}>
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
              <Pressable style={styles.main} onPress={() => setEditDescription(true)}>
                <InputField
                  label="Description"
                  placeholder="Enter your description here"
                  value={description}
                  editable={false}
                  onPress={() => setEditDescription(true)}
                  pointerEvents="none"
                />
              </Pressable>
            </View>
            {!keyboardVisible &&
              <Pressable onPress={submitChanges} style={styles.submitButton}>
                <Text style={[globalStyles.boldText, styles.buttonText]}>Submit changes</Text>
              </Pressable>
            }
          </View>
        </View>
      </TouchableWithoutFeedback>
      {editDescription && 
        <EditDescriptionModal 
          editDescription={editDescription}
          setEditDescription={setEditDescription}
          description={description}
          setDescription={setDescription}
        />
      }
    </>
  )
}
