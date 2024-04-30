import React, { View, Text } from "react-native"
import { styles } from "./styles"
import { RouteProp, useRoute } from "@react-navigation/native"
import { black, lightPeach } from "../../assets/colors/colors"
import * as Linking from 'expo-linking'
import QRCode from "react-native-qrcode-svg"

type RootStackParamList = {
  EventQrCodeScreen: {
    uid: string;
  }
}

type EventQrCodeScreenRouteProp = RouteProp<RootStackParamList, "EventQrCodeScreen">

const generateLink = (eventUid: string ) => {
  return Linking.createURL("event/" + eventUid)
}

export const EventQrCodeScreen = () => {
  const { uid } = useRoute<EventQrCodeScreenRouteProp>().params

  return (
    <View style={styles.container}>
      <Text>Event qr code</Text>
      <QRCode
        size={200}
        color={black}
        backgroundColor={lightPeach}
        value={generateLink(uid)}
      />
    </View>
  )
}
