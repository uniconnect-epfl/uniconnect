import React from "react"
import { View, TouchableOpacity, Text } from "react-native"

import styles from "./styles"
import { globalStyles } from "../../assets/global/globalStyles"
import { useNavigation } from "@react-navigation/native"

interface LowBarProps {
  nextScreen?: string
  buttonText?: string
  authenticate?: () => void
  checkFields?: () => boolean
}

const LowBar: React.FC<LowBarProps> = ({
  nextScreen,
  buttonText,
  authenticate = () => {},
  checkFields = () => true,
}) => {
  const navigation = useNavigation()
  const textB = buttonText ? buttonText : "Next"

  return (
    <View style={styles.nextBar}>
      <TouchableOpacity
        style={[styles.buttonSmall, styles.buttonSmallLeft]}
        onPress={() => navigation.goBack()}
      >
        <Text style={[styles.buttonTextLeft, globalStyles.text]}>Back</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonSmall}
        onPress={() => {
          if(nextScreen === "ExploreTabs"){
            authenticate()
          } else if(checkFields()){
            navigation.navigate(nextScreen as never)
          }
        }}
      >
        <Text style={[styles.buttonText, globalStyles.text]}>{textB}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default LowBar
