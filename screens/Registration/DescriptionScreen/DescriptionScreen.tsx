import React, { useContext } from "react"
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useNavigation } from "@react-navigation/native"
import styles from "./styles"
import { globalStyles } from "../../../assets/global/globalStyles"
import { TextInput } from "react-native-gesture-handler"
import { RegistrationContext } from "../../../contexts/RegistrationContext"

const DescriptionScreen: React.FC = () => {
  const insets = useSafeAreaInsets()
  const navigation = useNavigation()

  const { description, setDescription } = useContext(RegistrationContext)
 
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View
        style={[
          styles.container,
          { paddingBottom: insets.bottom, paddingTop: insets.top },
        ]}
      >
        <Text style={[globalStyles.boldText, styles.title]}>
          Add your Description
        </Text>

        <TextInput
          style={[styles.description, globalStyles.text]}
          multiline={true}
          textAlignVertical="top"
          onChangeText={setDescription}
          value={description}
          placeholder="Enter your description here..."
        />

        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.validation}
        >
            <Text style={globalStyles.boldText}>
                Validate
            </Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default DescriptionScreen
