import { View } from "react-native"
import { Ionicons } from '@expo/vector-icons'
import { black } from "../../../assets/colors/colors"
import { styles } from "./styles"

export const MyQrCodeScreen = () => {
  return (
    <View style={styles.container}>
        <Ionicons name='qr-code' size={200} color={black} />
    </View>
  )
}