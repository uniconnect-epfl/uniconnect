import React, { useState } from "react"

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
import { Ionicons } from "@expo/vector-icons"
import { peach } from "../../../assets/colors/colors"

const DescriptionScreen: React.FC = () => {
  const insets = useSafeAreaInsets()
  const [description, setDescription] = useState("")
  const navigation = useNavigation()

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
        ></TextInput>

        <TouchableOpacity
          onPress={() => navigation.navigate("Interests" as never)}
        >
          <Ionicons name="send-outline" color={peach} size={50} />
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default DescriptionScreen