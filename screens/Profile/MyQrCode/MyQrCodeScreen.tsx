import { View, Text } from "react-native"
import { Ionicons } from '@expo/vector-icons'
import { black } from "../../../assets/colors/colors"
import { styles } from "./styles"
import { globalStyles } from "../../../assets/global/globalStyles"

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

export const MyQrCodeScreen = () => {
  return (
    <View style={styles.container}>
        <View style={styles.qrContainer}>
          <View style={styles.textContainer}>
            <Text style={globalStyles.boldText}>{dummyData.firstName}</Text>
            <Text style={globalStyles.text}>Uniconnect contact</Text>
          </View>
          <View style={styles.container}>
            <Ionicons name='qr-code' size={200} color={black} />
          </View>
        </View>
    </View>
  )
}