import { View, Text, Pressable, KeyboardAvoidingView, TouchableWithoutFeedback, TextInput, Platform, Keyboard } from 'react-native'
import React from 'react'
import { globalStyles } from '../../assets/global/globalStyles'
import { styles } from './styles'

interface EditDescriptionModalProps {
  editDescription: boolean
  setEditDescription: (value: boolean) => void
  description: string
  setDescription: (value: string) => void
}

export const EditDescriptionModal = ({editDescription, setEditDescription, description, setDescription} : EditDescriptionModalProps) => {
  return (
    <>
      <Pressable style={styles.modalBackground} testID="background" onPress={() => setEditDescription(!editDescription)}/>
      <KeyboardAvoidingView style={styles.modal} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableWithoutFeedback style={styles.modalContainer} testID="close-keyboard"  onPress={() => Keyboard.dismiss()}>
        <View style={styles.modalContainer}>
          <TextInput
            style={[styles.description, globalStyles.text]}
            multiline={true}
            textAlignVertical="top"
            onChangeText={setDescription}
            value={description}
            placeholder="Enter your description here"
          />
          <Pressable onPress={() => setEditDescription(!editDescription)} style={styles.doneButton}>
            <Text style={[globalStyles.boldText, styles.buttonText]}>Done</Text>
          </Pressable>
        </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  )
}