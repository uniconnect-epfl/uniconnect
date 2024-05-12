import React from "react"
import {
  Modal,
  TouchableWithoutFeedback,
  View,
  Text,
  Image,
} from "react-native"
import { Node } from "../Graph"

import styles from "./styles"

const NodeModal: React.FC<{
  node: Node
  visible: boolean
  onPressOut: () => void
  onContactPress: (uid: string) => void
}> = ({ node, visible, onPressOut, onContactPress }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      testID="modal"
    >
      {/* Make the modal disappear when the user taps outside of it */}
      <TouchableWithoutFeedback
        onPress={() => {
          onPressOut()
        }}
        testID="modal-touchable"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            {/* Navigate to the contact's profile when the user taps on the contact's profile picture */}
            <TouchableWithoutFeedback
              onPress={() => {
                onPressOut()
                onContactPress(node.id)
              }}
            >
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
            </TouchableWithoutFeedback>
            <Text style={styles.modalProfileName}>
              {node.contact.firstName} {node.contact.lastName}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}

export default NodeModal
