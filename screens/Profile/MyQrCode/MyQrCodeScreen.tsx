import { View } from "react-native"
import { Ionicons } from '@expo/vector-icons'
import { black } from "../../../assets/colors/colors"

export const MyQrCodeScreen = () => {
  return (
    <View >
        <Ionicons name='qr-code' size={200} color={black} />
    </View>
  )
}