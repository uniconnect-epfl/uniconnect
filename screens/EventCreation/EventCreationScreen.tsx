import React, { useContext, useEffect, useState } from "react"
import { View, Text, ScrollView, Pressable } from "react-native"
import { styles } from "./styles"
import { useNavigation } from "@react-navigation/native"
import { Ionicons } from "@expo/vector-icons"
import { globalStyles } from "../../assets/global/globalStyles"
import { peach, white } from "../../assets/colors/colors"
import { createAnnouncement } from "../../firebase/ManageAnnouncements"
import { createEvent } from "../../firebase/ManageEvents"
import InputField from "../../components/InputField/InputField"
import MyDateInputComponent from "../../components/DatePicker/DatePicker"
import { RegistrationContext } from "../../contexts/RegistrationContext"
import { useSafeAreaInsets } from "react-native-safe-area-context"

interface EventCreationScreenProps {
  isAnnouncement?: boolean
}

const EventCreationScreen = ({ isAnnouncement }: EventCreationScreenProps) => {
import { createEvent } from "../../firebase/ManageEvents"
import { getUserData, updateUserEvents } from "../../firebase/User"
import { showErrorToast, showSuccessToast } from "../../components/ToastMessage/toast"
import { getAuth } from "firebase/auth"
import { User } from "../../types/User"

const EventCreationScreen = () => {
  const navigation = useNavigation()
  const [dateModal, setDateModal] = useState(false)
  const [date, setDate] = useState<Date>(new Date())
  const [hasBeenTouched, setHasBeenTouched] = useState(false)

  const [title, setTitle] = useState("")
  const [location, setLocation] = useState("")
  const insets = useSafeAreaInsets()
  const [interests] = useState(["Machine Learning, Sports, Tractoupelle"])

  const { description, setDescription } = useContext(RegistrationContext)

  const opacity = !hasBeenTouched ? 0.2 : 1

  const publish = async () => {
    // send the data to the backend
    console.log("Publishing event...")
    console.log("Title:", title)
    console.log("Location:", location)
    console.log("Description:", description)
    console.log("Date:", date.toDateString())
    console.log("Interests:", interests)

    if (isAnnouncement) {
      await createAnnouncement(
        "0",
        title,
        location,
        { x: 47.238458, y: 5.984155 },
        description,
        interests,
        date.toDateString()
      )
    } else {
      await createEvent(
        "0",
        title,
        description,
        date,
        { x: 47.238458, y: 5.984155 },
        location,
        "imageUrl"
      )
    }

    // after the user has filled out the form
    // we should make sure the global state is cleaned
    setDescription("")
  }
  const userId = getAuth().currentUser?.uid
  const [user, setUser] = useState<User | null>(null)
  const [, setLoading] = useState(false)
  // const [interests] = useState(["Machine Learning, Sports, Tractoupelle"])
  // const [date] = useState("12/07/2024")

  // const [startDate, setStartDate] = useState<Date>()
  // const [endDate, setEndDate] = useState("")
  // const [imageUrl, setImageUrl] = useState("")
  //  const [point, setPoint] = useState({ x: 47.238458, y: 5.984155 })

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      if (userId) {
        setUser(await getUserData(userId))
      }
      setLoading(false)
    }
    fetchData()
  }, [userId])

  const newEvent = async () => {
    if (!userId) {
      showErrorToast("You must be logged in to create an event")
      return
    }
    const eventId = await createEvent(title, description, new Date(2025, 0, 1), { x: 47.238458, y: 5.984155 }, location, "imageUrl")
    if (eventId && user) {
      await updateUserEvents(user.uid, eventId)
      showSuccessToast("Event created successfully")
    }
  }

  // const newAnnouncement = async () => {
  //   console.log("creating announcement")
  //   try {
  //     const announcementId = await createAnnouncement("0", title,location,{ x: 47.238458, y: 5.984155 }, description, interests, date)

  //     showSuccessToast("Announcement created succesfully")
  //   } catch (error) {
  //     showErrorToast("Could not create announcement")
  //   }
  // }

  return (
    <ScrollView style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 5 }]}>
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

          <Pressable onPress={() => alert("Coming in the next sprint")}>
            <View style={styles.tags}>
              {[...Array(3)].map((_, index) => (
                <View style={styles.addTag} key={index}>
                  <Ionicons name="add" size={24} color={white} />
                </View>
              ))}
            </View>
          </Pressable>
        </View>
        {!isAnnouncement && (
          <View style={styles.eventDetailsContainer}>
            {dateModal && (
              <MyDateInputComponent
                maximumDate={
                  new Date(new Date().setFullYear(new Date().getFullYear() + 1))
                }
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
            <Pressable
              style={styles.section}
              onPress={() => {
                setDateModal(true)
                setHasBeenTouched(true)
              }}
            >
              <Text style={[styles.label, globalStyles.text]}>{"Date*"}</Text>
              <View style={styles.input}>
                <Text style={[globalStyles.text, { opacity: opacity }]}>
                  {!hasBeenTouched
                    ? "DD.MM.YYYY"
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
          </View>
        )}
        <View style={styles.bottomButtons}>
          <Pressable style={styles.buttonBase}>
            <Text
              onPress={() => navigation.navigate("Description" as never)}
              style={globalStyles.boldText}
            >
              Add a description
            </Text>
          </Pressable>
          <Pressable style={styles.buttonBase} onPress={publish}>
            <Text style={globalStyles.boldText}>Validate</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  )
}

export default EventCreationScreen

