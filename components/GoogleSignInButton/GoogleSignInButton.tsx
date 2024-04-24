import { View, Text, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import React, { useEffect } from 'react'
import { globalStyles } from '../../assets/global/globalStyles'
import styles from './styles'
import * as Google from 'expo-auth-session/providers/google'
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth"
import { auth } from "./../../firebase/firebaseConfig"

export const GoogleSignInButton = () => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: "618676460374-9lv7cou7heq4l43tlth9tonkp0l7b007.apps.googleusercontent.com",
    androidClientId: "618676460374-hoqqpkp3k8j3psq88fmkdlvle4n2aa1s.apps.googleusercontent.com"
  })

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params
      const credential = GoogleAuthProvider.credential(id_token)
      signInWithCredential(auth, credential)
        .then((userCredential) => {
          console.log(userCredential.user)
        })
        .catch((error) => {
          alert("An error occurred while signing in with Google." + error.message)
        })
    }
  },[response])

  return (
    <TouchableOpacity testID="google-sign-in-button" style={styles.buttonGoogle} onPress={() => promptAsync()} disabled={!request}>
    <View style={styles.buttonPlaceholder}>
      <Ionicons
        name="logo-google"
        size={30}
        color="black"
        style={styles.icon}
      />
      <Text style={[styles.buttonText, globalStyles.boldText]}>
        Continue with google
      </Text>
    </View>
  </TouchableOpacity>
  )
}