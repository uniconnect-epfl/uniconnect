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
        
        <Image source={require("../../assets/icon.png")} style={styles.image} />
      
    

      {/* Username/Email Field */}
      <TextInput
        style={styles.inputField}
        placeholder="Username or email"
        placeholderTextColor={'black'}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Password Field */}
      <TextInput
        style={styles.inputField}
        placeholder="Password"
        placeholderTextColor={'black'}
        secureTextEntry
        autoCapitalize="none"
      />


      {/* Log In Button */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>

      <View >
        <Text style={styles.forgotPassword}>Forgot password?</Text>  

      </View>

      {/* Continue with Google */}
      <TouchableOpacity style={styles.buttonGoogle}>
        <Image 
          source ={require("../../assets/cont_w_google.png")}
          style = {styles.logo} />        
      </TouchableOpacity>
    </View>
  
  );
};


export default LoginScreen;