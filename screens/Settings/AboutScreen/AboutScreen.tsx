import React from "react"
import { Text, View, Image } from "react-native"
import { styles } from "./styles"
import { globalStyles } from "../../../assets/global/globalStyles"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { BackArrow } from "../../../components/BackArrow/BackArrow"

export const AboutScreen = () => {
  const insets = useSafeAreaInsets()
  const developers = [
    "Aidas Venckunas",
    "Alberto Centonze",
    "Gäel Conde",
    "Alexandre Mourot",
    "Gustave Charles",
    "Gaspard Thoral",
    "Pedro Laginhas",
  ]

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Text style={globalStyles.boldText}>About us</Text>
      <BackArrow />
      <Image
        source={require("../../../assets/icon.png")}
        style={styles.image}
      />
      <Text style={[globalStyles.text, styles.textContainer]}>
        Uniconnect is a social app that facilitates peer-to-peer connections
        between students and helps to easily find people who have same
        interests.
      </Text>
      <Text style={globalStyles.boldText}>Developers</Text>
      {developers.map((developer, index) => (
        <Text key={index} style={globalStyles.text}>
          {developer}
        </Text>
      ))}
    </View>
  )
}
