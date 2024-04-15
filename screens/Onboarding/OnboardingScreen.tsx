import React, { useRef, useState, useEffect } from 'react'
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Button
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import styles from './styles'
import { globalStyles } from '../../assets/global/globalStyles'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { loginEmailPassword } from "../../firebase/Login"
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin'
import { User } from '@react-native-google-signin/google-signin'



const OnboardingScreen: React.FC = () => {
  const navigation = useNavigation()
  const insets = useSafeAreaInsets()
  const nextRef = useRef<TextInput>(null)

  //States for Firebase auth
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  //state for Google Sign In
  const [error, setError] = useState<string | null>("")
  const [userInfo, setUserInfo] = useState<User | null>(null)


  useEffect(() => {
    GoogleSignin.configure({webClientId: "618676460374-5h642avt17te1uj9qo8imr233gb6n3qj.apps.googleusercontent.com"})
  }, []
  )

  const googleSignin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const user: User = await GoogleSignin.signIn();
      setUserInfo(user);
      setError(null);
    } catch (e) {
      setError((e as string));
    }
  }

  const googleLogout = () => {
    setUserInfo(null);
    GoogleSignin.revokeAccess();
    GoogleSignin.signOut();
  };

  const loginUser = async () => {
    setLoading(true)

    try {
      const val = await loginEmailPassword(email, password)

      if (val) {
        navigation.navigate("HomeTabs" as never)
      } else {
        alert("Login failed!")
      }
    } catch (error) {
      alert("An error occurred during login.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View
        style={[
          styles.container,
          { paddingBottom: insets.bottom, paddingTop: insets.top },
        ]}
      >
        <Image source={require('../../assets/icon.png')} style={styles.image} />

        {/* Username/Email Field */}
        <TextInput
          id="username_placeholder"
          style={[styles.inputField, globalStyles.text]}
          placeholder="Username or email"
          placeholderTextColor={'black'}
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          onSubmitEditing={() => nextRef.current?.focus()}
        />

        {/* Password Field */}
        <TextInput
          style={[styles.inputField, globalStyles.text]}
          placeholder="Password"
          placeholderTextColor={'black'}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
          ref={nextRef}
        />

        {/* Log In Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={loginUser}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text style={[styles.buttonText, globalStyles.boldText]}>Log In</Text>
          )}
        </TouchableOpacity>

        <View>
          <TouchableOpacity>
            <Text style={[styles.smallText, globalStyles.text]}>
              Forgot password?
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.container}>
          {userInfo && <Text>{JSON.stringify(userInfo.user)}</Text>}
          {userInfo ? (
            <Button title="Logout" onPress={googleLogout} />
          ) : (
            <GoogleSigninButton
            size={GoogleSigninButton.Size.Standard}
              color={GoogleSigninButton.Color.Light}
              onPress={googleSignin}
            />
          )}
        </View>

        <TouchableOpacity
          style={[styles.footer, { bottom: insets.bottom }]}
          onPress={() => navigation.navigate('Information' as never)}
        >
          <Text style={[styles.smallText, globalStyles.text]}>
            Dont have an account?
          </Text>
          <Text style={[styles.specialText, globalStyles.text]}> Sign Up</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default OnboardingScreen
