import React, { useState, useRef, useContext } from "react"
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  TouchableWithoutFeedback,
  Keyboard,

} from "react-native"
import styles from "./styles"
import { globalStyles } from "../../../assets/global/globalStyles"
import { Ionicons } from "@expo/vector-icons"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import LowBar from "../../../components/LowBar/LowBar"
import InputField from "../../../components/InputField/InputField"
import Divider from "../../../components/Divider/Divider"
import { TextInput } from "react-native-gesture-handler"
import { Entypo } from "@expo/vector-icons"
import { AntDesign } from "@expo/vector-icons"
import MyDateInputComponent from "../../../components/DatePicker/DatePicker"
import { useNavigation } from "@react-navigation/native"
import { RegistrationContext } from "../../../contexts/RegistrationContext"
import useKeyboardVisibility from "../../../hooks/useKeyboardVisibility"
import { showErrorToast } from "../../../components/ToastMessage/toast"

const InformationScreen: React.FC = () => {
  const insets = useSafeAreaInsets()
  const [loc, setLoc] = useState(false)
  const firstRef = useRef<TextInput>(null)
  const thirdRef = useRef<TextInput>(null)
  const lastRef = useRef<TextInput>(null)
  const [dateModal, setDateModal] = useState(false)
  const [hasBeenTouched, setHasBeenTouched] = useState(false)
  const useNav = useNavigation()
  const keyboardVisible = useKeyboardVisibility()

  const {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    date,
    setDate,
    location,
    setLocation,
    description,
  } = useContext(RegistrationContext)

  const onPress = () => {
    setDateModal(true)
    setHasBeenTouched(true)
  }

  const checkFields = () => {
    if (firstName === "") {
      showErrorToast("You need to input your first name!")
      return false
    }
    if (lastName === "") {
      showErrorToast("You need to input your last name!")
      return false
    }
    if (!hasBeenTouched) {
      showErrorToast("You need to input your birth day!")
      return false
    }
    return true
  }

  const opacity = !hasBeenTouched ? 0.2 : 1

  return (
    <TouchableWithoutFeedback
      style={styles.container}
      onPress={() => Keyboard.dismiss()}
    >
      <View
        style={[
          styles.container,
          { paddingTop: insets.top, paddingBottom: insets.bottom },
        ]}
      >
        <Image
          source={require("../../../assets/icon.png")}
          style={styles.image}
        />

        <View style={styles.fieldsContainer}>
          <InputField
            label="First name*"
            placeholder="First name"
            value={firstName}
            onChangeText={setFirstName}
            returnKeyType="next"
            onSubmitEditing={() => firstRef.current?.focus()}
          />
          <InputField
            label="Last name*"
            placeholder="Last name"
            returnKeyType="next"
            value={lastName}
            onChangeText={setLastName}
            ref={firstRef}
            onSubmitEditing={() => thirdRef.current?.focus()}
          />

          <TouchableOpacity style={styles.section} onPress={onPress}>
            <Text style={[styles.label, globalStyles.text]}>
              {"Date of Birth*"}
            </Text>
            <View style={styles.input}>
              <Text style={[globalStyles.text, { opacity: opacity }]}>
                {!hasBeenTouched
                  ? "JJ.MM.YYYY"
                  : "" +
                    date.getUTCDate().toString() +
                    "." +
                    (date.getUTCMonth() + 1).toString() +
                    "." +
                    date.getFullYear().toString() +
                    ""}
              </Text>
            </View>
          </TouchableOpacity>

          <InputField
            label="Location"
            placeholder="Location"
            value={location}
            onChangeText={setLocation}
            returnKeyType="next"
            ref={thirdRef}
            onSubmitEditing={() => lastRef.current?.focus()}
          />

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
                Use my location
              </Text>
              {!loc && <Entypo name="cross" color="red" />}
              {loc && <AntDesign name="check" color="green" />}
            </TouchableOpacity>
          </View>

          <Divider />

          <TouchableOpacity
            style={[styles.button, styles.buttonContainer, styles.description]}
            onPress={() => useNav.navigate("Description" as never)}
          >
            <Text style={[styles.buttonText, globalStyles.text]}>
              {description.length === 0
                ? "Add a description now"
                : "Edit your description"}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.footer, { bottom: insets.bottom }]}>
          {!keyboardVisible && (
            <LowBar nextScreen="Interests" checkFields={checkFields} />
          )}
        </View>

        {dateModal && (
          <MyDateInputComponent
            date={date}
            setDate={setDate}
            setDateModal={setDateModal}
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  )
}

export default InformationScreen
