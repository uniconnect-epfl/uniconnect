import React, { useState } from 'react';

import { View, Text, Image, TouchableOpacity } from 'react-native';

import InputField from '../../../components/InputField/InputField';

import styles from './styles';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { globalStyles } from '../../../assets/global/globalStyles';
import Divider from '../../../components/divider/divider';
import LowBar from '../../../components/LowBar/LowBar';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const AuthenticationScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const MIN_LENGHT = 8;
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');

  const isPassword = () => {
    return password.length >= MIN_LENGHT;
  };

  const doPasswordsMatch = () => {
    return password === confirmPassword;
  };

  const isEmail = () => {
    return true;
  };

  const doEmailsMatch = () => {
    return email == confirmEmail;
  };

  /**
   * Function that submits the user data to the DB
   */
  const submitForm = () => {
    if (isPassword() && doPasswordsMatch() && isEmail() && doEmailsMatch()) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <View style={{ paddingBottom: insets.bottom, paddingTop: insets.top }}>
      <Image
        source={require('../../../assets/icon.png')}
        style={styles.image}
      />

      <Text style={[styles.title, globalStyles.boldText]}>Last Step</Text>

      <InputField
        label="Password*"
        placeholder="****************"
        onChangeText={setPassword}
        value={password}
      ></InputField>

      <InputField
        label="Confirm Password*"
        placeholder="****************"
        onChangeText={setConfirmPassword}
        value={confirmPassword}
      ></InputField>

      <View style={styles.container}>
        <View style={styles.phrase}>
          <Entypo name="cross" color="red" />
          <Text style={[globalStyles.text, globalStyles.smallText]}>
            Password strength
          </Text>
        </View>

        <View style={styles.phrase}>
          {!doPasswordsMatch() && <Entypo name="cross" color="red" />}
          {doPasswordsMatch() && <AntDesign name="check" color="green" />}
          <Text style={[globalStyles.text, globalStyles.smallText]}>
            Passwords matching
          </Text>
        </View>

        <View style={styles.phrase}>
          {!isPassword() && <Entypo name="cross" color="red" />}
          {isPassword() && <AntDesign name="check" color="green" />}
          <Text style={[globalStyles.text, globalStyles.smallText]}>
            At least 8 characters
          </Text>
        </View>

        <View style={styles.phrase}>
          <Entypo name="cross" color="red" />
          <Text style={[globalStyles.text, globalStyles.smallText]}>
            Contains a number and a symbol
          </Text>
        </View>
      </View>

      <Divider />

      <InputField
        label="E-mail*"
        placeholder="E-mail"
        onChangeText={setEmail}
        value={email}
      ></InputField>

      <InputField
        label="Confirm e-mail*"
        placeholder="Confirm your e-mail"
        onChangeText={setConfirmEmail}
        value={confirmEmail}
      ></InputField>

      <TouchableOpacity style={styles.button} onPress={submitForm}>
        <Text style={globalStyles.boldText}>Send confirmation e-mail</Text>
      </TouchableOpacity>

      <LowBar />
    </View>
  );
};

export default AuthenticationScreen;
