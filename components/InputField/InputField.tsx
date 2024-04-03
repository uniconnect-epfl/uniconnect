import React from 'react';
import { View, TextInput, Text } from 'react-native';
import { globalStyles } from '../../assets/global/globalStyles';

import styles from './styles';

interface InputFieldProps {
    label: string;
    placeholder: string;
  }

const InputField: React.FC<InputFieldProps> = ({label, placeholder}) => {


    
    return(
        <View style = {styles.section}>
        <Text style={[styles.topText, globalStyles.text]}>{label}</Text>    
        <TextInput placeholder={placeholder} style={[styles.input, globalStyles.text]} />
      </View>
    )
};

export default InputField;

