import { Modal, TouchableWithoutFeedback, View, Text } from "react-native"

import styles from "./styles"
import { Event } from "../../../types/Event"
import { Ionicons } from "@expo/vector-icons"
import { peach } from "../../../assets/colors/colors"
import React = require("react")

const EventMapModal: React.FC<{
  event: Event
  visible: boolean
  onPressOut: () => void
  onEventPress: () => void
}> = ({
  event,
  visible,
  onPressOut,
  onEventPress,
}: {
  event: Event
  visible: boolean
  onPressOut: () => void
  onEventPress: () => void
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onPressOut}
      testID="modal"
    >
      <TouchableWithoutFeedback onPress={onPressOut} testID="modal-touchable">
        <View style={styles.modalContainer}>
          {/* Make the modal disappear when the user taps outside of it */}
          <TouchableWithoutFeedback onPress={onEventPress}>
            {event && (
              <View style={styles.modalView}>
                <Text
                  style={styles.modalEventTitle}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {event.title}
                </Text>
                <Text style={styles.modalEventLocation}>
                  <Ionicons name="location" size={14} color={peach} />{" "}
                  {event.location
                    .toString()
                    .toLowerCase()
                    .split(" ")
                    .map((word) => {
                      return word.charAt(0).toUpperCase() + word.slice(1)
                    })
                    .join(" ")}
                </Text>
                <Text style={styles.modalEventDate}>
                  <Ionicons name="calendar" size={14} color={peach} />{" "}
                  {new Date(event.date as string).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </Text>
                <Text
                  style={styles.modalEventDescription}
                  numberOfLines={10}
                  ellipsizeMode="tail"
                >
                  {event.description.normalize()}
                </Text>
              </View>
            )}
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}

export default EventMapModal
