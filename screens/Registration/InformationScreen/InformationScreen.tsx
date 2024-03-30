import React from 'react';
import { View, TextInput, TouchableOpacity, Text, Image, SafeAreaView } from 'react-native';
import Styles from './styles';
const Form: React.FC = () => {
  // State for form fields can be added here

  return (

    <SafeAreaView style={Styles.container}>
   
      <View style = {Styles.icon_container}>
        <Image source ={require("../../../assets/icon.png")} style={Styles.image} />  
      </View>
    
      <View style = {[Styles.section, Styles.sectionFirst]}>
        <Text style={Styles.topText}>First name*</Text>    
        <TextInput placeholder="First Name" style={Styles.input} />
      </View>
          
      <View style = {Styles.section}>
        <Text style={Styles.topText}>Last name*</Text>
        <TextInput placeholder="Last Name" style={Styles.input} />
      </View>

      <View style = {Styles.section}>
        <Text style={Styles.topText}>Date of birth*</Text>
        <TextInput placeholder="Date of Birth" style={Styles.input} />
      </View>
        
      <View style = {[Styles.section, Styles.sectionLast]}>
        <Text style={Styles.topText}>Location</Text>
        <TextInput placeholder="Location" style={Styles.input} />
      </View>
      

      <View style={Styles.buttonContainer}>
        <TouchableOpacity style = {[Styles.button, Styles.locationButton]}>

          <Image source={require("../../../assets/pin-icon.png")} style = {Styles.icon}/>
          <Text style = {[Styles.buttonText, Styles.locationText]}>Use my location?</Text>

        </TouchableOpacity>

      </View>

      <View style = {Styles.divider}/>


      {/* Additional buttons and functionality can be added here */}
      <View style={Styles.buttonContainer}>    
        <TouchableOpacity style={Styles.button}>
          <Text style={Styles.buttonText}>Add a description now</Text>
        </TouchableOpacity>
      </View>

      <View style={Styles.barContainer}>
        <View style={Styles.nextBar}>

        <TouchableOpacity style={[Styles.buttonSmall, Styles.buttonSmallLeft]}>
        <Text style = {Styles.buttonTextLeft}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style = {Styles.buttonSmall}>
        <Text>Next</Text>
        </TouchableOpacity>


          </View>
      </View>
      
     



    </SafeAreaView>
  );
};

export default Form;
