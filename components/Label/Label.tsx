import React from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { Entypo } from "@expo/vector-icons"
import { black } from "../../assets/colors/colors"
import styles from "./styles"
import { globalStyles } from "../../assets/global/globalStyles"

interface LabelProps {
  text: string
  onClick: () => void
}

const Label: React.FC<LabelProps> = ({ text, onClick }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onClick}>
        <Entypo name="cross" color={black} />
        <Text style={[globalStyles.text, styles.text]}>{text}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Label
