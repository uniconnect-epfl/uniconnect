/* eslint-disable react/no-unescaped-entities */
//this is the login screenx
import React from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image
} from 'react-native';

import '../../assets/global/globalStyles'

import styles from './styles'; // Make sure the path is correct
import { GlobalStyles } from '../../assets/global/globalStyles';


const LoginScreen: React.FC = () => {
  
  return (
    <View style={styles.container}>
        
        <Image source={require("../../assets/icon.png")} style={styles.image} />
      
    

      {/* Username/Email Field */}
      <TextInput
        style={[styles.inputField, GlobalStyles.text]}
        placeholder="Username or email"
        placeholderTextColor={'black'}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Password Field */}
      <TextInput
        style={[styles.inputField, GlobalStyles.text]}
        placeholder="Password"
        placeholderTextColor={'black'}
        secureTextEntry
        autoCapitalize="none"
      />


      {/* Log In Button */}
      <TouchableOpacity style={styles.button}>
        <Text style={[styles.buttonText, GlobalStyles.boldText]}>Log In</Text>
      </TouchableOpacity>

      <View >
        <Text style={[styles.smallText, GlobalStyles.text]}>Forgot password?</Text>  

      </View>

      {/* Continue with Google */}
      <TouchableOpacity style={styles.buttonGoogle}>
        <Image 
          source ={require("../../assets/cont_w_google.png")}
          style = {styles.logo} />        
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style= {styles.smallText}>Don't have an account?</Text>
        <Text style = {styles.specialText}> Sign Up</Text>
      </View>
    </View>
  
  );
};


export default LoginScreen;