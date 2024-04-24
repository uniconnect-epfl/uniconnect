import { View, Text, TouchableOpacity, Alert } from "react-native"
import { BarCodeScanningResult, Camera } from "expo-camera"
import { styles } from "./styles"
import { globalStyles } from "../../assets/global/globalStyles"
import { useIsFocused } from "@react-navigation/native"
import { useState } from "react"

const QrScanScreen = () => {
  const isFocused = useIsFocused()
  const [permission, requestPermission] = Camera.useCameraPermissions()
  const [qrScanned, setQrScanned] = useState(false)

  const handleBarCodeScanned = ({ type, data }: BarCodeScanningResult): void => {
    if(!qrScanned){
      setQrScanned(true)
      Alert.alert(
        "QR scanned", 
        `type: ${type}\ndata:${data}`,
        [
          { 
            text: "OK", 
            onPress: () => setQrScanned(false)
          },
        ],
        { cancelable: false }
      )
    }
  }

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

      <Text style={[globalStyles.text, styles.scanAQrText]}>Scan a QR code</Text>
      {isFocused && <Camera 
        style={styles.camera}
        onBarCodeScanned={handleBarCodeScanned}
      />}

    </View>
  )
}

export default QrScanScreen
