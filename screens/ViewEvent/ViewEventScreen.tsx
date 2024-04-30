import React, { View, Text } from "react-native"
import { styles } from "./styles"
import { RouteProp, useRoute } from "@react-navigation/native"

type RootStackParamList = {
  ViewEventScreen: {
    uid: string;
  }
}
  
type ViewEventScreenRouteProp = RouteProp<RootStackParamList, "ViewEventScreen">

export const ViewEventScreen = () => {
  const { uid } = useRoute<ViewEventScreenRouteProp>().params

  return (
    <View style={styles.container}>
      <Text>Event with uid : {uid}</Text>
    </View>
  )
}