import { View, Text, TouchableOpacity } from "react-native"
import { Camera } from "expo-camera"
import { styles } from "./styles"
import { globalStyles } from "../../assets/global/globalStyles"

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
        <View style={styles.requestAuthorizationContainer}>
          <Text style={[globalStyles.boldText, styles.authorizationText]}>
            We need your permission to show the camera
          </Text>
          <TouchableOpacity
            style={styles.requestAuthorizationsButton}
            onPress={requestPermission}
          >
            <Text style={globalStyles.text}>
              Authorize
            </Text>
          </TouchableOpacity>
        </View>
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
