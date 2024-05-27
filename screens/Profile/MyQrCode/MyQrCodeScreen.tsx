import React, { useEffect, useState } from "react"
import { View, Text } from "react-native"
import { styles } from "./styles"
import { globalStyles } from "../../../assets/global/globalStyles"
import QRCode from "react-native-qrcode-svg"
import { black, lightPeach, peach } from "../../../assets/colors/colors"
import * as Linking from "expo-linking"
import { getAuth } from "firebase/auth"
import { getUserData } from "../../../firebase/User"
import LoadingScreen from "../../Loading/LoadingScreen"
import { User } from "../../../types/User"
import { BackArrow } from "../../../components/BackArrow/BackArrow"

const generateLink = (uid: string) => {
  // this create the deep link that can directly redirect in the app when scanned from outside
  return Linking.createURL("contact/" + uid)
}

export const MyQrCodeScreen = () => {
  const userId = getAuth().currentUser?.uid
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // load the user data asynchronously
    const fetchData = async () => {
      setLoading(true)
      if(userId){
        setUser(await getUserData(userId))
      }
      setLoading(false)
    }
    fetchData()
  }, [userId])

  if(loading || !user || !userId){
    // until the user is loaded we put the loading screen
    return <LoadingScreen/>
  }
  
  return (
    <View style={styles.container}>
        <BackArrow />
        <View style={styles.contactContainer}>
          <View style={styles.textContainer}>
            <Text style={globalStyles.boldText}>{user.firstName}</Text>
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
              value={generateLink(userId)}
            />
          </View>
        </View>
    </View>
  )
}