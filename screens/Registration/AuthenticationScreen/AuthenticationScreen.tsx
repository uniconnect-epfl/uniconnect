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
import Divider from "../../../components/Divider/Divider"
import LowBar from "../../../components/LowBar/LowBar"
import { Entypo } from "@expo/vector-icons"
import { AntDesign } from "@expo/vector-icons"
import { red, green } from "../../../assets/colors/colors"
import { createAccount } from "../../../firebase/Registration"
import { showErrorToast } from "../../../components/ToastMessage/toast"
import useKeyboardVisibility from "../../../hooks/useKeyboardVisibility"

//verifies that the pw has a number and a symbol
function contains(password: string): boolean {
  const symbols = '!@#$%^&*(),.?":{}|<>'
  let hasNumber = false
  let hasSymbol = false

  for (const char of password) {
    if (char >= "0" && char <= "9") {
      hasNumber = true
    } else if (symbols.includes(char)) {
      hasSymbol = true
    }

    // Early exit if both conditions are met
    if (hasNumber && hasSymbol) {
      return true
    }
  }

  return false
}

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
  const keyboardVisible = useKeyboardVisibility()

  const isPassword = () => {
    return password.length >= MIN_LENGHT
  }

  const doPasswordsMatch = () => {
    return password === confirmPassword
  }

  const isEmail = () => {
    return email.includes("@") && email.includes(".")
  }

  const doEmailsMatch = () => {
    return email == confirmEmail
  }

  const submitForm = async () => {
    if (
      isPassword() &&
      doPasswordsMatch() &&
      isEmail() &&
      doEmailsMatch() &&
      contains(password)
    ) {
      await createAccount(email, password)
    } else {
      //for each failure case give a different error message

      showErrorToast("Please fill in the form correctly and try again")
    }
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => Keyboard.dismiss()}
      style={{ bottom: insets.bottom, top: insets.top }}
    >
      <View style={styles.mainContainer}>
        <Image
          source={require("../../../assets/icon.png")}
          style={styles.image}
        />

        <Text style={[styles.title, globalStyles.boldText]}>Last Step</Text>

        <InputField
          label="Password*"
          placeholder="****************"
          secureTextEntry
          onChangeText={setPassword}
          value={password}
          onSubmitEditing={() => firstRef.current?.focus()}
        ></InputField>

        <InputField
          label="Confirm Password*"
          placeholder="****************"
          secureTextEntry
          onChangeText={setConfirmPassword}
          value={confirmPassword}
          ref={firstRef}
          onSubmitEditing={() => secRef.current?.focus()}
        ></InputField>

        <View style={styles.container}>
          <View style={styles.phrase}>
            {contains(password) && isPassword() && doPasswordsMatch() && (
              <AntDesign name="check" color={green} />
            )}

            {(!contains(password) || !isPassword() || !doPasswordsMatch()) && (
              <Entypo name="cross" color="red" />
            )}

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
            {!contains(password) && <Entypo name="cross" color={red} />}
            {contains(password) && <AntDesign name="check" color={green} />}

            <Text style={[globalStyles.text, globalStyles.smallText]}>
              Contains a number and a symbol
            </Text>
          </View>
        </View>

        <Divider />

        <View>
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
        </View>

        <View style={[styles.footer, { bottom: insets.bottom }]}>
          {!keyboardVisible && (
            <LowBar
              nextScreen="HomeTabs"
              buttonText="Confirm"
              authenticate={submitForm}
            />
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default AuthenticationScreen
