import React, { useEffect, useState } from "react"
import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from "react-native"
import { BarCodeScanningResult, Camera } from "expo-camera"
import { styles } from "./styles"
import { globalStyles } from "../../assets/global/globalStyles"
import { useIsFocused } from "@react-navigation/native"
import { peach } from "../../assets/colors/colors"

const QrScanScreen = () => {
  const isFocused = useIsFocused()
  const [permission, requestPermission] = Camera.useCameraPermissions()
  const [showCamera, setShowCamera] = useState(false)
  const [qrScanned, setQrScanned] = useState(false)

  // to allow mounting and unmounting the camera without slowing navigation
  useEffect(() => {
    if (isFocused) {
      setShowCamera(true)
    } else {
      setShowCamera(false)
    }
  }, [isFocused])

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

  // we have camera permissions, we show the camera
  return (
    <View style={styles.container}>

      <Text style={[globalStyles.text, styles.scanAQrText]}>Scan a QR code</Text>
      {showCamera ? (
        <Camera 
          testID="camera"
          style={styles.camera}
          onBarCodeScanned={handleBarCodeScanned}
        />
      ) : (
        <View style={styles.container}>
          <ActivityIndicator
            testID="activity-indicator" 
            size="large" 
            color={peach} 
          />
        </View>
      )}

    </View>
  )
}

export default QrScanScreen
