import { View, Text } from "react-native"
import { styles } from "./styles"
import React from "react"
import { getAuth } from "firebase/auth"
import EventScreen from "../../Home/EventScreen/EventScreen"
import { useNavigation } from "@react-navigation/native"

export const ProfileEvents = () => {
  const userId = getAuth().currentUser?.uid
  const navigation = useNavigation()
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Events</Text>
      <EventScreen onEventPress={(event) => navigation.navigate("ViewEvent", {eventUid: event.uid})} userID={userId} />
    </View>
  )
}
