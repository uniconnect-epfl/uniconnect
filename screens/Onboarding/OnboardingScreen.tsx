import React, { useRef, useState } from 'react'
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native'
import styles from './styles'
import { globalStyles } from '../../assets/global/globalStyles'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { loginEmailPassword } from "../../firebase/Login"
import { GoogleSignInButton } from '../../components/GoogleSignInButton/GoogleSignInButton'
import { peach } from '../../assets/colors/colors'




const OnboardingScreen: React.FC = () => {
  const navigation = useNavigation()
  const insets = useSafeAreaInsets()
  const nextRef = useRef<TextInput>(null)

  //States for Firebase auth
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const loginUser = async () => {
    setLoading(true)
    await loginEmailPassword(email, password)
    setLoading(false)
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
            <ActivityIndicator size="small" color={peach} />
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

        <GoogleSignInButton/>

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
