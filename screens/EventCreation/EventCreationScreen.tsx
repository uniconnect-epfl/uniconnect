import React, { useState } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native"
import { styles } from "./styles"
import { useNavigation } from "@react-navigation/native"
import { Ionicons } from "@expo/vector-icons"
import { globalStyles } from "../../assets/global/globalStyles"
import { peach, white } from "../../assets/colors/colors"
import { createEvent } from "../../firebase/ManageEvents"

const EventCreationScreen = () => {
  const navigation = useNavigation()
  const [isEvent, setIsEvent] = useState(false)
  const [title, setTitle] = useState("")
  const [description] = useState("lore ipsum")
  const [location] = useState("Besac City")
  // const [startDate, setStartDate] = useState<Date>()
  // const [endDate, setEndDate] = useState("")
  // const [imageUrl, setImageUrl] = useState("")
//  const [point, setPoint] = useState({ x: 47.238458, y: 5.984155 })


  const newEvent = async () => {
    console.log("Creating event")
    await createEvent("uid2", title, description, new Date(2025, 0, 1), { x: 47.238458, y: 5.984155 }, location, "imageUrl")
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          testID="back-button"
        >
          <Ionicons name="arrow-back-outline" size={24} color={peach} />
        </TouchableOpacity>
        <View style={styles.headerIcon}>
          <Ionicons name="add" size={24} color={peach} />
        </View>
      </View>
      <View style={styles.body}>
        <View
          style={
            isEvent
              ? [styles.toggleBase, styles.toggleEvent ]
              : [styles.toggleBase, styles.toggleAnnouncement]
          }
        >
          <TouchableOpacity
            onPress={() => setIsEvent(!isEvent)}
          >
            <Text style={isEvent ? styles.toggleTextEvent : styles.toggleTextAnnouncement}>
              {isEvent ? "Event" : "Announcement"}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.form}>
          <View style={styles.tagsSepator}>
            <TextInput style={[styles.input, globalStyles.text]} placeholder="Title" onChangeText={setTitle}/>
            <Text style={[styles.tagsTitle, globalStyles.text]}>Choose up to three tags</Text>
            <View style={styles.tags}>
              <View style={styles.addTag}>
                <Ionicons name="add" size={24} color={white} />
              </View>
              <View style={styles.addTag}>
                <Ionicons name="add" size={24} color={white} />
              </View>
              <View style={styles.addTag}>
                <Ionicons name="add" size={24} color={white} />
              </View>
            </View>
          </View>
          {isEvent && (
            <>
              <View style={styles.dateContainer}>
                <TextInput style={[styles.input, globalStyles.text]} placeholder="Start Date" />
                <TextInput style={[styles.input, globalStyles.text]} placeholder="End Date" />
              </View>
              <TextInput style={[styles.input, globalStyles.text]} placeholder="Location" />
            </>
          )}
          <View style={styles.bottomButtons}>
          <TouchableOpacity style={[styles.buttonBase, styles.buttonDescription]}>
            <Text onPress={() => Alert.alert("SOON^TM")} style={globalStyles.boldText}>Add a description</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.buttonBase, styles.buttonValidate]}>
            <Text onPress={newEvent} style={globalStyles.boldText}>Validate</Text>
          </TouchableOpacity>
        </View>
        </View>
      </View>
    </ScrollView>
  )
}

export default EventCreationScreen
