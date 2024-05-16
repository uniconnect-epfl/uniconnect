import React, { useEffect, useState } from "react"
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native"
import { BarcodeScanningResult, CameraView, useCameraPermissions } from "expo-camera"
import { styles } from "./styles"
import { globalStyles } from "../../assets/global/globalStyles"
import { NavigationProp, ParamListBase, useIsFocused } from "@react-navigation/native"
import { peach } from "../../assets/colors/colors"
import { getAuth } from "firebase/auth"
import { showErrorToast } from "../../components/ToastMessage/toast"
import { getUserData } from "../../firebase/User"
import * as Linking from "expo-linking"
import { useDebouncedCallback } from "use-debounce"

interface ScanQrScreenProps{
  navigation: NavigationProp<ParamListBase>
}

const QrScanScreen = ({navigation} : ScanQrScreenProps) => {
  // for the camera management
  const isFocused = useIsFocused()
  const [permission, requestPermission] = useCameraPermissions()
  const [showCamera, setShowCamera] = useState(false)
  const [isScanning, setIsScanning] = useState(false)
  // current user
  const userId = getAuth().currentUser?.uid

  // to allow mounting and unmounting the camera without slowing navigation
  useEffect(() => {
    if (isFocused) {
      setShowCamera(true)
    } else {
      setShowCamera(false)
    }
  }, [isFocused])

  const handleUser = async (id : string) => {
    if(id === userId){
      showErrorToast("This is you!")
    } else {
      const scannedUser = await getUserData(id)
      if(scannedUser === null || scannedUser === undefined){
        showErrorToast("User not found")
      } else {
        navigation.navigate("ExternalProfile", {externalUserUid: id})
      }
    }
  }

  const handleEvent = async (id : string) => {
    showErrorToast("events QR codes not implemented yet, event id: " + id)
  }

  // logic for the qr code scanning wrapped in a debouncer
  const debouncedQr = useDebouncedCallback((linkScanned) => {
    if(linkScanned){
      const path = linkScanned.replace(Linking.createURL("/"), "")
      const [route, id] = path.split("/")
      if(route === "contact") handleUser(id)
      else if (route === "event") handleEvent(id)
      else showErrorToast("Qr code not recognized")
    }
    setIsScanning(false)
  }, 300)

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
        <CameraView
          testID="camera"
          style={styles.camera}
          barcodeScannerSettings={{
            barcodeTypes: ["qr"],
          }}
          onBarcodeScanned={(result: BarcodeScanningResult) => {
            if(!isScanning) {
              setIsScanning(true)
              debouncedQr(result.data)
            }
          }}
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
