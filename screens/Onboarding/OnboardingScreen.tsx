//this is the login screenx
import React from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image
} from 'react-native';

import styles from './styles'; // Make sure the path is correct


const LoginScreen: React.FC = () => {
  return (
    <View style={styles.container}>

      <View style={styles.logoPlaceholder} />
        <Image source={require("../../assets/icon.png")} style={styles.image} />

      {/* Username/Email Field */}
      <TextInput
        style={styles.inputField}
        placeholder="Username or email"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Password Field */}
      <TextInput
        style={styles.inputField}
        placeholder="Password"
        secureTextEntry
        autoCapitalize="none"
      />

      {/* Log In Button */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>

      {/* Forgot Password Link */}
      <TouchableOpacity>
        <Text style={styles.forgotPassword}>Forgot password?</Text>
      </TouchableOpacity>

      {/* Divider */}
      <View style={styles.dividerContainer}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>OR</Text>
        <View style={styles.dividerLine} />
      </View>

      {/* Continue with Google */}
      <TouchableOpacity style={styles.buttonGoogle}>
        <Text style={styles.buttonTextGoogle}>Continue with Google</Text>
      </TouchableOpacity>

      {/* Sign Up Link */}
      <View style={styles.signUpContainer}>
        <Text style={styles.signUpText}>Dont have an account?</Text>
        <TouchableOpacity>
          <Text style={styles.signUpButton}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


export default LoginScreen;