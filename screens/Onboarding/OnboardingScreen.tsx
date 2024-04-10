import React from 'react' 
import { Text, View, TextInput, TouchableOpacity, Image } from 'react-native' 

import '../../assets/global/globalStyles' 
import { Ionicons } from '@expo/vector-icons' 
import styles from './styles' 
import { globalStyles } from '../../assets/global/globalStyles' 
import { useSafeAreaInsets } from 'react-native-safe-area-context' 
import { useNavigation } from '@react-navigation/native' 

const OnboardingScreen: React.FC = () => {
  const navigation = useNavigation() 
  const insets = useSafeAreaInsets() 

  return (
    <View
      style={[
        styles.container,
        { paddingBottom: insets.bottom, paddingTop: insets.top },
      ]}
    >
      <Image source={require('../../assets/icon.png')} style={styles.image} />

      {/* Username/Email Field */}
      <TextInput
        style={[styles.inputField, globalStyles.text]}
        placeholder="Username or email"
        placeholderTextColor={'black'}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Password Field */}
      <TextInput
        style={[styles.inputField, globalStyles.text]}
        placeholder="Password"
        placeholderTextColor={'black'}
        secureTextEntry
        autoCapitalize="none"
      />

      {/* Log In Button */}
      <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate("Home" as never)}} >
        <Text style={[styles.buttonText, globalStyles.boldText]}>Log In</Text>
      </TouchableOpacity>

      <View>
        <TouchableOpacity>
          <Text style={[styles.smallText, globalStyles.text]}>
            Forgot password?
          </Text>
        </TouchableOpacity>
      </View>

      {/* Continue with Google */}
      <TouchableOpacity style={styles.buttonGoogle}>
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

      <TouchableOpacity style={styles.footer} onPress={() => navigation.navigate("Information" as never)}>
        <Text style={styles.smallText}>Dont have an account?</Text>
        <Text style={styles.specialText}> Sign Up</Text>
      </TouchableOpacity>
    </View>
  )
}

export default OnboardingScreen
