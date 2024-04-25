import React from "react"
import { Modal, TouchableWithoutFeedback, View, Text } from "react-native"
import Svg, { Image } from "react-native-svg"
import { Node } from "../Graph"

import styles from "./styles"

import profile_picture_0 from "../../../assets/graph-template-profile-pictures/graph-template-profile-picture-0.png"
import profile_picture_1 from "../../../assets/graph-template-profile-pictures/graph-template-profile-picture-1.png"
import profile_picture_2 from "../../../assets/graph-template-profile-pictures/graph-template-profile-picture-2.png"
import profile_picture_3 from "../../../assets/graph-template-profile-pictures/graph-template-profile-picture-3.png"
import profile_picture_4 from "../../../assets/graph-template-profile-pictures/graph-template-profile-picture-4.png"
import profile_picture_5 from "../../../assets/graph-template-profile-pictures/graph-template-profile-picture-5.png"
import profile_picture_6 from "../../../assets/graph-template-profile-pictures/graph-template-profile-picture-6.png"

const PROFILE_PICTURES = [
  profile_picture_0,
  profile_picture_1,
  profile_picture_2,
  profile_picture_3,
  profile_picture_4,
  profile_picture_5,
  profile_picture_6,
]

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
        <TouchableWithoutFeedback
          onPress={() => {
            onPressOut()
          }}
          testID="modal-touchable"
        >
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback>
              <View style={styles.modalView}>
                <Svg style={styles.modalProfilePicture}>
                <Image
                    key={node.id + "modalimage"}
                    width={styles.modalProfilePicture.width}
                    height={styles.modalProfilePicture.height}
                    href={
                        PROFILE_PICTURES[
                            parseInt(node.id) % PROFILE_PICTURES.length
                        ]
                    }
                    onPress={() => {
                        onPressOut()
                        onContactPress(node.id)
                    }}
                    testID="modal-profile-picture"
                />
                </Svg>
                <Text style={styles.modalProfileName}>
                  Node ID: {node.id}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    )
}

export default NodeModal