import React from "react"
import { View, TouchableOpacity } from "react-native"
import { styles } from "./styles"
import { useNavigation } from "@react-navigation/native"
import { Ionicons } from "@expo/vector-icons"
import { peach } from "../../assets/colors/colors"

export const SettingsScreen = () => {
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} testID="back-arrow">
          <Ionicons name="arrow-back-outline" size={24} color={peach} />
        </TouchableOpacity>
    </View>
  )
}
