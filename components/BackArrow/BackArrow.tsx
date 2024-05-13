import React from "react"
import { TouchableOpacity } from "react-native"
import { styles } from "./styles"
import { useNavigation } from "@react-navigation/native"
import { Ionicons } from "@expo/vector-icons"
import { peach } from "../../assets/colors/colors"

export const BackArrow = () => {
  const navigation = useNavigation()

  return (
    <TouchableOpacity 
      style={styles.arrow}
      onPress={() => navigation.goBack()} 
      testID="back-arrow">
        <Ionicons name="arrow-back-outline" size={24} color={peach} />
    </TouchableOpacity>
  )
}
