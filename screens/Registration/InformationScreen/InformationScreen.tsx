import React from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import styles from './styles';
import { globalStyles } from '../../../assets/global/globalStyles';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LowBar from '../../../components/LowBar/LowBar';
import InputField from '../../../components/InputField/InputField';
const Form: React.FC = () => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
    >
      <Image
        source={require('../../../assets/icon.png')}
        style={styles.image}
      />
      <InputField label="First name*" placeholder="First name" />
      <InputField label="Last name*" placeholder="Last name" />
      <InputField label="Date of Birth*" placeholder="Date of birth" />
      <InputField label="Location" placeholder="Location" />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.locationButton]}>
          <Ionicons name="location-outline" size={20} color="black" />
          <Text
            style={[styles.buttonText, styles.locationText, globalStyles.text]}
          >
            Use my location?
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.divider} />

      <TouchableOpacity style={[styles.button, styles.buttonContainer]}>
        <Text style={[styles.buttonText, globalStyles.text]}>
          Add a description now
        </Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <LowBar />
      </View>
    </View>
  );
};

export default Form;