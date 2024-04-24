import React, { useState, useRef } from "react"

import {
  Text,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Keyboard,
  TextInput,
} from "react-native"

import InputField from "../../../components/InputField/InputField"

import styles from "./styles"

import { useSafeAreaInsets } from "react-native-safe-area-context"
import { globalStyles } from "../../../assets/global/globalStyles"
import Divider from "../../../components/Divider/Divider"
import LowBar from "../../../components/LowBar/LowBar"
import { Entypo } from "@expo/vector-icons"
import { AntDesign } from "@expo/vector-icons"
import { red, green } from "../../../assets/colors/colors"
import { createAccount, storeEmail } from "../../../firebase/Registration"

const AuthenticationScreen: React.FC = () => {
  const insets = useSafeAreaInsets()
  const MIN_LENGHT = 8
  const [password, setPassword] = useState<string>("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [email, setEmail] = useState("")
  const [confirmEmail, setConfirmEmail] = useState("")
  const firstRef = useRef<TextInput>(null)
  const secRef = useRef<TextInput>(null)
  const thirdRef = useRef<TextInput>(null)

  const isPassword = () => {
    return password.length >= MIN_LENGHT
  }

  const doPasswordsMatch = () => {
    return password === confirmPassword
  }

  const isEmail = () => {
    return true
  }

  const doEmailsMatch = () => {
    return email == confirmEmail
  }

  /**
   * Function that submits the user data to the DB
   */
  const submitForm = async () => {
    if (isPassword() && doPasswordsMatch() && isEmail() && doEmailsMatch()) {
      createAccount(email, password)
        .then(() => console.log('Account created. Check email'))
        .catch((error: Error) => console.error('There was an error', error))

      storeEmail(email)
        .then(() => console.log('Email stored successfully'))
        .catch((error: Error) => console.error('Failed to store email:', error))
    } else {
      alert("Please check your data")
    }
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{ paddingBottom: insets.bottom, paddingTop: insets.top }}>
        <Image
          source={require("../../../assets/icon.png")}
          style={styles.image}
        />

        <Text style={[styles.title, globalStyles.boldText]}>Last Step</Text>

        <InputField
          label="Password*"
          placeholder="****************"
          onChangeText={setPassword}
          value={password}
          onSubmitEditing={() => firstRef.current?.focus()}
        ></InputField>

        <InputField
          label="Confirm Password*"
          placeholder="****************"
          onChangeText={setConfirmPassword}
          value={confirmPassword}
          ref={firstRef}
          onSubmitEditing={() => secRef.current?.focus()}
        ></InputField>

        <View style={styles.container}>
          <View style={styles.phrase}>
            <Entypo name="cross" color="red" />
            <Text style={[globalStyles.text, globalStyles.smallText]}>
              Password strength
            </Text>
          </View>

          <View style={styles.phrase}>
            {!doPasswordsMatch() && <Entypo name="cross" color={red} />}
            {doPasswordsMatch() && <AntDesign name="check" color={green} />}
            <Text style={[globalStyles.text, globalStyles.smallText]}>
              Passwords matching
            </Text>
          </View>

          <View style={styles.phrase}>
            {!isPassword() && <Entypo name="cross" color={red} />}
            {isPassword() && <AntDesign name="check" color={green} />}
            <Text style={[globalStyles.text, globalStyles.smallText]}>
              At least 8 characters
            </Text>
          </View>

          <View style={styles.phrase}>
            <Entypo name="cross" color={red} />
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
          ref={secRef}
          onSubmitEditing={() => thirdRef.current?.focus()}
        ></InputField>

        <InputField
          label="Confirm e-mail*"
          placeholder="Confirm your e-mail"
          onChangeText={setConfirmEmail}
          value={confirmEmail}
          ref={thirdRef}
        ></InputField>

        <TouchableOpacity style={styles.button} onPress={submitForm}>
          <Text style={globalStyles.boldText}>Send confirmation e-mail</Text>
        </TouchableOpacity>

        <LowBar nextScreen="HomeTabs" buttonText="Finish"/>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default AuthenticationScreen
