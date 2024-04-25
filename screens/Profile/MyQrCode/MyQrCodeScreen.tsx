import React from "react"
import { View, Text } from "react-native"
import { styles } from "./styles"
import { globalStyles } from "../../../assets/global/globalStyles"
import QRCode from "react-native-qrcode-svg"
import { black, lightPeach, peach } from "../../../assets/colors/colors"
import * as Linking from 'expo-linking'

interface ContactData {
  uid: string,
  firstName: string,
  lastName: string,
}

const dummyData : ContactData = {
  uid: "123",
  firstName: "Gilles",
  lastName: "Mempapeur"
}

const generateLink = (contactData : ContactData) => {
  return Linking.createURL("uniconnect/contact/" + contactData.uid)
}

export const MyQrCodeScreen = () => {
  return (
    <View style={styles.container}>
        <View style={styles.contactContainer}>
          <View style={styles.textContainer}>
            <Text style={globalStyles.boldText}>{dummyData.firstName}</Text>
            <Text style={globalStyles.text}>Uniconnect contact</Text>
          </View>
          <View style={styles.qrContainer}>
            <QRCode
              size={200}
              color={black}
              backgroundColor={lightPeach}
              logo={require("../../../assets/icon.png")}
              logoBackgroundColor={peach}
              logoBorderRadius={10}
              logoSize={30}
              value={generateLink(dummyData)}
            />
          </View>
        </View>
    </View>
  )
}