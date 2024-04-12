import React, { useState } from 'react'
import { View, TouchableOpacity, Text, Image, TextInput } from 'react-native'
import styles from './styles'
import { globalStyles } from '../../../assets/global/globalStyles'
import { Ionicons } from '@expo/vector-icons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import LowBar from '../../../components/LowBar/LowBar'
import InputField from '../../../components/InputField/InputField'
import Divider from '../../../components/divider/divider'

const InformationScreen: React.FC = () => {
  const insets = useSafeAreaInsets()
  const [isTextInputVisible, setTextInputVisible] = useState(false)
  const [text, setText] = useState('')

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

      <Divider />

      <TouchableOpacity
        style={[styles.button, styles.buttonContainer]}
        onPress={() => setTextInputVisible(!isTextInputVisible)}
      >
        <Text style={[styles.buttonText, globalStyles.text]}>
          Add a description now
        </Text>
      </TouchableOpacity>

      {isTextInputVisible && (
        <View style={styles.description}>
          <TextInput
            style={globalStyles.text}
            placeholder="Describe yourself here!"
            onChangeText={setText}
            value={text}
          ></TextInput>
        </View>
      )}

      <View style={styles.footer}>
        <LowBar />
      </View>
    </View>
  )
}

export default InformationScreen
