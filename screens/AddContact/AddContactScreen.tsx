import React from "react"
import { View, Text } from "react-native"
import { styles } from "./styles"
import { RouteProp, useRoute } from "@react-navigation/native"

type RootStackParamList = {
  AddContactScreen: {
      uid: string;
  }
}

type AddContactScreenRouteProp = RouteProp<RootStackParamList, "AddContactScreen">;

export const AddContactScreen = () => {
  const { uid } = useRoute<AddContactScreenRouteProp>().params

  return (
    <View style={styles.container}>
      <Text>Adding contact with uid: {uid}</Text>
    </View>
  )
}
