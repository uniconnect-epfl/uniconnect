import React from "react"
import { useRef, useState, useEffect } from "react"
import {
  Modal,
  TouchableWithoutFeedback,
  View,
  Text,
  Image,
  Animated,
  Easing,
} from "react-native"
import { Node } from "../Graph"

import styles from "./styles"

const SLIDE_OUT_DURATION = 1000
const SLIDE_IN_DURATION = 2000

const NodeModal: React.FC<{
  node: Node
  visible: boolean
  onPressOut: () => void
  onContactPress: (uid: string) => void
}> = ({ node, visible, onPressOut, onContactPress }) => {
  // Animation related elements
  const translateY = useRef(new Animated.Value(3)).current

  const slideOutModal = () => {
    Animated.timing(translateY, {
      toValue: 3,
      duration: SLIDE_OUT_DURATION,
      useNativeDriver: true,
    }).start()
    onPressOut()
  }

  const slideInModal = () => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: SLIDE_IN_DURATION,
      useNativeDriver: true,
      easing: Easing.elastic(2),
    }).start()
  }

  // Modal visibility
  const [modalVisible, setModalVisible] = useState(false)

  // Use effect to handle modal visibility while animating
  useEffect(() => {
    if (visible) {
      setModalVisible(true)
      slideInModal()
    } else {
      setTimeout(() => {
        setModalVisible(false)
      }, SLIDE_OUT_DURATION)
    }
  }, [visible])

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={modalVisible}
      onRequestClose={slideOutModal}
      testID="modal"
    >
      {/* Make the modal disappear when the user taps outside of it */}
      <TouchableWithoutFeedback
        onPress={slideOutModal}
        testID="modal-touchable"
      >
        <Animated.View
          style={[
            styles.modalContainer,
            {
              transform: [
                {
                  translateY: translateY.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -500], // Adjust this value as needed
                  }),
                },
              ],
            },
          ]}
        >
          <TouchableWithoutFeedback
            onPress={() => {
              slideOutModal()
              onContactPress(node.id)
            }}
            testID="modal-touchable-contact"
          >
            <View style={styles.modalView}>
              {/* Navigate to the contact's profile when the user taps on the contact's profile picture */}
              <Image
                key={node.id + "modalimage"}
                source={
                  node.contact.profilePictureUrl === ""
                    ? require("../../../assets/default_profile_picture.png")
                    : { uri: node.contact.profilePictureUrl }
                }
                style={styles.modalProfilePicture}
                testID="modal-profile-picture"
              />
              <Text style={styles.modalProfileName}>
                {node.contact.firstName} {node.contact.lastName}
              </Text>
              <Text style={styles.modalProfileDescription}>
                {node.contact.description}
              </Text>
              <Text style={styles.modalProfileInterests}>
                {node.contact.interests.slice(0, 3).join("\n")}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </Animated.View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}

export default NodeModal
