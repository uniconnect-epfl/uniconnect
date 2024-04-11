import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import styles from './styles';
import { globalStyles } from '../../../assets/global/globalStyles';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LowBar from '../../../components/LowBar/LowBar';
import InputField from '../../../components/InputField/InputField';
import Divider from '../../../components/divider/divider';
import { TextInput } from 'react-native-gesture-handler';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const InformationScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const [desc, setDesc] = useState(false);
  const [loc, setLoc] = useState(false);

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

      <View>
        <InputField label="First name*" placeholder="First name" />
        <InputField label="Last name*" placeholder="Last name" />
        <InputField label="Date of Birth*" placeholder="Date of birth" />
        <InputField label="Location" placeholder="Location" />

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.locationButton]}
            onPress={() => setLoc(!loc)}
          >
            <Ionicons name="location-outline" size={20} color="black" />
            <Text
              style={[
                styles.buttonText,
                styles.locationText,
                globalStyles.text,
              ]}
            >
              Use my location?
            </Text>
            {!loc && <Entypo name="cross" color="red" />}
            {loc && <AntDesign name="check" color="green" />}
          </TouchableOpacity>
        </View>

        <Divider />

        {desc && <TextInput style={styles.description}></TextInput>}

        <TouchableOpacity
          style={[styles.button, styles.buttonContainer]}
          onPress={() => setDesc(!desc)}
        >
          <Text style={[styles.buttonText, globalStyles.text]}>
            Add a description now
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <LowBar />
      </View>
    </View>
  );
};

export default InformationScreen;
