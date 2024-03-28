import React from 'react';
import { View, TextInput, TouchableOpacity, Text, Image } from 'react-native';
import Styles from './styles';

const Form: React.FC = () => {
  // State for form fields can be added here

  return (

    <View style={Styles.container}>

      <Image source ={require("../../../assets/icon.png")} style={Styles.image} />

      <Text style={Styles.topText}>First name*</Text>    
      <TextInput placeholder="First Name" style={Styles.input} />

      <Text style={Styles.topText}>Last name*</Text>
      <TextInput placeholder="Last Name" style={Styles.input} />

      <Text style={Styles.topText}>Date of birth*</Text>
      <TextInput placeholder="Date of Birth" style={Styles.input} />

      <Text style={Styles.topText}>Location</Text>
      <TextInput placeholder="Location" style={Styles.input} />
      
      {/* Additional buttons and functionality can be added here */}

      <TouchableOpacity style={Styles.button}>
        <Text style={Styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Form;
