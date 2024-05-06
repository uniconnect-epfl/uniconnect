import React, { useState, useRef } from "react"
import {
  Text,
  Image,
  TouchableWithoutFeedback,
  View,
  Keyboard,
  TextInput,
} from "react-native"
import InputField from "../../../components/InputField/InputField"
import styles from "./styles"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { globalStyles } from "../../../assets/global/globalStyles"
import LowBar from "../../../components/LowBar/LowBar"
import { Entypo } from "@expo/vector-icons"
import { AntDesign } from "@expo/vector-icons"
import { red, green } from "../../../assets/colors/colors"
import { createAccount } from "../../../firebase/Registration"
import { showErrorToast } from "../../../components/ToastMessage/toast"

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
    return password.length >= MIN_LENGHT && password === confirmPassword
  }

  const isPasswordStrong = () => {
    return password.match(`^(?=.*[0-9])(?=.*[^a-zA-Z0-9\\s]).+$`)
  }

  const isEmail = () => {
    return email.includes("@") && email.includes(".")
  }

  const doEmailsMatch = () => {
    return email == confirmEmail
  }

  const submitForm = async () => {
    if(!isPassword()) {
      showErrorToast("Password must be at least 8 characters long")
      return
    }
    else if(!doPasswordsMatch()) {
      showErrorToast("Passwords do not match")
      return
    }
    else if(!isEmail()) {
      showErrorToast("Please enter a valid email address")
      return
    }
    else if(!doEmailsMatch()) {
      showErrorToast("Emails do not match")
      return
    }
    await createAccount(email, password)
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={[styles.view, {paddingBottom: insets.bottom, paddingTop: insets.top }]}>
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
          secureTextEntry={true}
        ></InputField>

        <InputField
          label="Confirm Password*"
          placeholder="****************"
          onChangeText={setConfirmPassword}
          value={confirmPassword}
          ref={firstRef}
          onSubmitEditing={() => secRef.current?.focus()}
          secureTextEntry={true}
        ></InputField>

        <View style={styles.container}>

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
            {!isPasswordStrong() && <Entypo name="cross" color={red} />}
            {isPasswordStrong() && <AntDesign name="check" color={green} />}
            <Text style={[globalStyles.text, globalStyles.smallText]}>
              Contains a number and a symbol
            </Text>
          </View>
        </View>

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
        <View style={[styles.absolute, {paddingBottom: insets.bottom}]}>
          <LowBar nextScreen="HomeTabs" buttonText="Confirm" authenticate={submitForm} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default AuthenticationScreen
