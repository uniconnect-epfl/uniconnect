import { View } from "react-native"
import { styles } from "./styles"
import React from "react"
import EventScreen from "../../Explore/EventScreen/EventScreen"
import { useNavigation } from "@react-navigation/native"
import { User } from "../../../types/User"

export const ProfileEvents = (userId: string ) => {
  const navigation = useNavigation()

  const onHostPress = (host: User) => {
    navigation.navigate("ExternalProfile", {
      externalUserUid: host.uid,
    })
  }

  return (
    <View style={styles.container}>
      <EventScreen
        onEventPress={(event) =>
          navigation.navigate("ViewEvent", {
            onHostPress: onHostPress,
            eventUid: event.uid,
          })
        }
        userID={userId}
      />
    </View>
  )
}
