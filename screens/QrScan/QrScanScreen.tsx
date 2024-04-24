import { View, Text, Button } from "react-native"
import { Camera } from "expo-camera"
import { styles } from "./styles"

const QrScanScreen = () => {
  const [permission, requestPermission] = Camera.useCameraPermissions()

  if (!permission) {
    // Camera permissions are still loading
    return <View />
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={styles.container}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text>Scan Qr</Text>
      <Camera />
    </View>
  )
}

export default QrScanScreen
