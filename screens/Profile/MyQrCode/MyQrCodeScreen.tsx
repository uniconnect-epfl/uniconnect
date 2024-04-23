import React from "react"
import { View, Text } from "react-native"
import { styles } from "./styles"
import { globalStyles } from "../../../assets/global/globalStyles"
import QRCode from "react-native-qrcode-svg"
import { black, lightPeach } from "../../../assets/colors/colors"

interface ContactData {
  uid: string,
  firstName: string,
  lastName: string,
}

const dummyData : ContactData = {
  uid: "467839564739",
  firstName: "Gilles",
  lastName: "Mempapeur"
}

const generateLink = (contactData : ContactData) => {
  return "Uniconnect/contact/" + contactData.uid
}

export const MyQrCodeScreen = () => {
  return (
    <View style={styles.container}>
        <View style={styles.qrContainer}>
          <View style={styles.textContainer}>
            <Text style={globalStyles.boldText}>{dummyData.firstName}</Text>
            <Text style={globalStyles.text}>Uniconnect contact</Text>
          </View>
          <View style={styles.container}>
            <QRCode
              size={200}
              color={black}
              backgroundColor={lightPeach}
              logo={require("../../../assets/icon.png")}
              value={generateLink(dummyData)}
            />
          </View>
        </View>
    </View>
  )
}