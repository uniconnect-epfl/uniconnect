import React, { useEffect, useState } from "react"
import { View, Text, Image, TouchableOpacity, Alert } from "react-native"
import { styles } from "./styles"
import { RouteProp, useRoute } from "@react-navigation/native"
import { User } from "../../types/User"
import LoadingScreen from "../Loading/LoadingScreen"
import { getUserData } from "../../firebase/User"
import { Ionicons } from "@expo/vector-icons"
import { black } from "../../assets/colors/colors"
import { globalStyles } from "../../assets/global/globalStyles"

const userProfilePictureUrl = "" // dummy url for the moment, until profile pictures are in the database

type RootStackParamList = {
  AddContactScreen: {
      uid: string; // uid of the contact to be added
  }
}

type AddContactScreenRouteProp = RouteProp<RootStackParamList, "AddContactScreen">;

export const AddContactScreen = () => {
  const { uid } = useRoute<AddContactScreenRouteProp>().params
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // load the use data asynchronously
    const fetchData = async () => {
      setLoading(true)
      if(uid){
        setUser(await getUserData(uid))
      }
      setLoading(false)
    }
    fetchData()
  }, [uid])

  if(loading || !user || !uid){
    // put loading screen until the user is correctly loaded
    return <LoadingScreen/>
  }

  return (
    <View style={styles.container}>

      <View style={styles.profilePictureContainer}>
        {userProfilePictureUrl ? (
          <Image // put a profile picture if we have one
            style={styles.profilePicture}
            source={{ uri: userProfilePictureUrl }}
          />
        ) : ( // put an icon otherwise
          <View style={styles.profilePicture}>
            <Ionicons name="person" size={130} color={black} />
          </View>
        )}
      </View>

      <View style={styles.infosContainer}>
        <Text style={globalStyles.boldText}>{user.firstName} {user.lastName}</Text>
        <View style={styles.horizontalContainer}>
            <Ionicons name="location-outline" size={13} color={black} />
            <Text style={globalStyles.smallText}>{user.location}</Text>
        </View>
        <Text style={[globalStyles.smallText, styles.description]}>{user.description}</Text>
      </View>

      <View style={styles.addButtonContainer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            Alert.alert("Not implemented yet")
          }}>
            <Text style={globalStyles.boldText}>Add to contacts</Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}
