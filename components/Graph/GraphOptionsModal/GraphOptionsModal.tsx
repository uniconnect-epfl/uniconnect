import React from "react"
import { useState, useEffect } from "react"
import { Modal, View, Text, TouchableWithoutFeedback } from "react-native"
import Slider from "@react-native-community/slider"
import { Ionicons } from "@expo/vector-icons"
import { SimulationParameters } from "../ForceDirectedGraph/ForceDirectedGraph"

import styles from "./styles"
import { peach } from "../../../assets/colors/colors"

interface GraphOptionsModalProps {
  visible: boolean | null
  updateSimulationParameters: (param: SimulationParameters) => void
  initialParameters: SimulationParameters
}

const GraphOptionsModal: React.FC<GraphOptionsModalProps> = ({
  visible,
  updateSimulationParameters,
  initialParameters,
}: GraphOptionsModalProps) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [distance, setDistance] = useState(initialParameters.distance)
  const [charge, setCharge] = useState(initialParameters.charge)
  const [collide, setCollide] = useState(initialParameters.collide)

  useEffect(() => {
    if (visible != null) {
      setModalVisible(true)
    }
  }, [visible])

  useEffect(() => {
    updateSimulationParameters({ distance, charge, collide })
  }, [distance, charge, collide])

  return (
    <Modal visible={modalVisible} animationType="slide" transparent={true}>
      <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Adjust Simulation Parameters</Text>
            <Ionicons
              name="sync-outline"
              size={24}
              color={peach}
              style={styles.resetIcon}
              onPress={() => {
                setDistance(100)
                setCharge(-200)
                setCollide(20)
              }}
              testID="reset-parameters"
            />
            <Slider
              value={distance}
              onValueChange={setDistance}
              minimumValue={0}
              maximumValue={300}
              step={10}
              thumbTintColor={peach}
              minimumTrackTintColor={peach}
              style={styles.slider}
            />
            <Text style={styles.sliderText}>Distance: {distance}</Text>
            <Slider
              value={charge}
              onValueChange={setCharge}
              minimumValue={-500}
              maximumValue={0}
              step={10}
              thumbTintColor={peach}
              minimumTrackTintColor={peach}
              style={styles.slider}
            />
            <Text style={styles.sliderText}>Charge: {charge}</Text>
            <Slider
              value={collide}
              onValueChange={setCollide}
              minimumValue={0}
              maximumValue={100}
              step={5}
              thumbTintColor={peach}
              minimumTrackTintColor={peach}
              style={styles.slider}
            />
            <Text style={styles.sliderText}>Collide: {collide}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}

export default GraphOptionsModal
