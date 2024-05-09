import React, { useState } from "react"
import { View, Text, Pressable, ScrollView } from "react-native"
import { styles } from "./styles"
import { useNavigation } from "@react-navigation/native"
import { Ionicons } from "@expo/vector-icons"
import { globalStyles } from "../../assets/global/globalStyles"
import { peach, white } from "../../assets/colors/colors"
import { createAnnouncement } from "../../firebase/ManageAnnouncements"
import InputField from "../../components/InputField/InputField"
import MyDateInputComponent from "../../components/DatePicker/DatePicker"

interface EventCreationScreenProps {
  isAnnouncement: undefined | boolean
}

const EventCreationScreen = ({ isAnnouncement }: EventCreationScreenProps) => {
  // const firstRef = React.useRef<TextInput>(null)
  const navigation = useNavigation()
  const [dateModal, setDateModal] = useState(false)
  const [date, setDate] = useState<Date>(new Date())
  const [hasBeenTouched, setHasBeenTouched] = useState(false)

  const [title, setTitle] = useState("")
  const [description] = useState("lorem ipsum")
  const [location, setLocation] = useState("")
  const [interests] = useState(["Machine Learning, Sports, Tractoupelle"])

  // const [imageUrl, setImageUrl] = useState("")
  //  const [point, setPoint] = useState({ x: 47.238458, y: 5.984155 })

  // const newEvent = async () => {
  //   console.log("Creating event")
  //   await createEvent("uid2", title, description, new Date(2025, 0, 1), { x: 47.238458, y: 5.984155 }, location, "imageUrl")
  // }
  const opacity = !hasBeenTouched ? 0.2 : 1

  const newAnnouncement = async () => {
    await createAnnouncement(
      "0",
      title,
      location,
      { x: 47.238458, y: 5.984155 },
      description,
      interests,
      date.toDateString()
    )
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} testID="back-button">
          <Ionicons name="arrow-back-outline" size={24} color={peach} />
        </Pressable>
        <View style={styles.headerIcon}>
          <Ionicons name="add" size={24} color={peach} />
        </View>
      </View>
      <View style={styles.body}>
        <View style={styles.tagsSeparator}>
          <InputField
            label="Title*"
            placeholder="Chemistry x Python"
            value={title}
            onChangeText={setTitle}
          />
          <Text style={[styles.tagsTitle, globalStyles.text]}>
            Choose up to three tags
          </Text>
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
        {!isAnnouncement && (
          <View style={styles.eventDetailsContainer}>
            {dateModal && (
              <MyDateInputComponent
                date={date}
                setDate={setDate}
                setDateModal={setDateModal}
              />
            )}
            <InputField
              label="Location*"
              placeholder="Turing Avenue 69"
              value={location}
              onChangeText={setLocation}
            />
          </View>
        )}
        <Pressable
          style={styles.section}
          onPress={() => {
            setDateModal(true)
            setHasBeenTouched(true)
          }}
        >
          <Text style={[styles.label, globalStyles.text]}>
            {"Date of Birth*"}
          </Text>
          <View style={styles.input}>
            <Text style={[globalStyles.text, { opacity: opacity }]}>
              {!hasBeenTouched
                ? "JJ.MM.YYYY"
                : "" +
                  date.getUTCDate().toString() +
                  "." +
                  (date.getUTCMonth() + 1).toString() +
                  "." +
                  date.getFullYear().toString() +
                  ""}
            </Text>
          </View>
        </Pressable>
        <View style={styles.bottomButtons}>
          <Pressable style={styles.buttonBase}>
            <Text
              onPress={() =>
                navigation.navigate("Description" as never, {} as never)
              }
              style={globalStyles.boldText}
            >
              Add a description
            </Text>
          </Pressable>
          <Pressable style={styles.buttonBase}>
            <Text onPress={newAnnouncement} style={globalStyles.boldText}>
              Validate
            </Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  )
}

export default EventCreationScreen
