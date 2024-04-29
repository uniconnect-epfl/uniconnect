import React, { useEffect, useState } from "react"
import { View, Text } from "react-native"
import { styles } from "./styles"
import { RouteProp, useRoute } from "@react-navigation/native"
import { User } from "../../types/User"
import LoadingScreen from "../Loading/LoadingScreen"
import { getUserData } from "../../firebase/User"

type RootStackParamList = {
  AddContactScreen: {
      uid: string;
  }
}

type AddContactScreenRouteProp = RouteProp<RootStackParamList, "AddContactScreen">;

export const AddContactScreen = () => {
  const { uid } = useRoute<AddContactScreenRouteProp>().params
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
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
    return <LoadingScreen/>
  }

  return (
    <View style={styles.container}>
      <Text>{user.firstName} {user.lastName}</Text>
    </View>
  )
}
