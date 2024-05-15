import React, { useEffect, useRef, useState } from "react"
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

const NodeModal: React.FC<{
  node: Node
  visible: boolean
  onPressOut: () => void
  onContactPress: (uid: string) => void
}> = ({ node, visible, onPressOut, onContactPress }) => {
  const translateY = useRef(new Animated.Value(0)).current

  const [modalVisible, setModalVisible] = useState(false)

  const slideOutModal = () => {
    Animated.timing(translateY, {
      toValue: 3,
      duration: 1000,
      useNativeDriver: true,
    }).start()
    onPressOut()
  }

  const slideInModal = () => {
    // Fast animation to move to final position
    const fastAnimation = Animated.timing(translateY, {
      toValue: 0, // Move slightly above the final position
      duration: 1500, // Fast duration
      useNativeDriver: true,
      easing: Easing.elastic(3), // Use the elastic easing
    })

    fastAnimation.start()
  }

  useEffect(() => {
    if (visible) {
      setModalVisible(true)
      slideInModal()
    } else {
      setTimeout(() => {
        setModalVisible(false)
      }, 500)
    }
  }, [visible])

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={modalVisible}
      onRequestClose={slideOutModal}
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
              onContactPress(node.id)
            }}
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
            </View>
          </TouchableWithoutFeedback>
        </Animated.View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}

export default NodeModal
