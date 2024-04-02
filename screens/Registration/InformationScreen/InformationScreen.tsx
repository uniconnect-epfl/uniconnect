import React from 'react';
import { View, TextInput, TouchableOpacity, Text, Image, SafeAreaView } from 'react-native';
import Styles from './styles';
import { GlobalStyles } from '../../../assets/global/globalStyles';
import {Ionicons} from '@expo/vector-icons';

const Form: React.FC = () => {
  // State for form fields can be added here

  return (

    <SafeAreaView style={Styles.container}>
   
      <View style = {Styles.icon_container}>
        <Image source ={require("../../../assets/icon.png")} style={Styles.image} />  
      </View>
    
      <View style = {[Styles.section, Styles.sectionFirst]}>
        <Text style={[Styles.topText, GlobalStyles.text]}>First name*</Text>    
        <TextInput placeholder="First Name" style={[Styles.input, GlobalStyles.text]} />
      </View>
          
      <View style = {Styles.section}>
        <Text style={[Styles.topText, GlobalStyles.text]}>Last name*</Text>
        <TextInput placeholder="Last Name" style={[Styles.input, GlobalStyles.text]} />
      </View>

      <View style = {Styles.section}>
        <Text style={[Styles.topText, GlobalStyles.text]}>Date of birth*</Text>
        <TextInput placeholder="Date of Birth" style={[Styles.input, GlobalStyles.text]} />
      </View>
        
      <View style = {[Styles.section, Styles.sectionLast]}>
        <Text style={[Styles.topText, GlobalStyles.text]}>Location</Text>
        <TextInput placeholder="Location" style={[Styles.input, GlobalStyles.text]} />
      </View>
      

      <View style={Styles.buttonContainer}>
        <TouchableOpacity style = {[Styles.button, Styles.locationButton]}>

        <Ionicons name="location-outline" size={20} color="black" />
        <Text style = {[Styles.buttonText, Styles.locationText, GlobalStyles.text]}>Use my location?</Text>

        </TouchableOpacity>

      </View>

      <View style = {Styles.divider}/>


      {/* Additional buttons and functionality can be added here */}
      <View style={Styles.buttonContainer}>    
        <TouchableOpacity style={Styles.button}>
          <Text style={[Styles.buttonText, GlobalStyles.text]}>Add a description now</Text>
        </TouchableOpacity>
      </View>

      <View >
        <View style={Styles.nextBar}>

        <TouchableOpacity style={[Styles.buttonSmall, Styles.buttonSmallLeft]}>
        <Text style = {[Styles.buttonTextLeft, GlobalStyles.text]}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style = {Styles.buttonSmall}>
        <Text style={[Styles.buttonText, GlobalStyles.text]}>Next</Text>
        </TouchableOpacity>


          </View>
      </View>
      
     



    </SafeAreaView>
  );
};

export default Form;
