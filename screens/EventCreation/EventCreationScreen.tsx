import React, { useContext, useEffect, useState } from "react"
import { View, Text, ScrollView, Pressable } from "react-native"
import { styles } from "./styles"
import {
  NavigationProp,
  ParamListBase,
  useRoute,
} from "@react-navigation/native"
import { Ionicons } from "@expo/vector-icons"
import { globalStyles } from "../../assets/global/globalStyles"
import { peach, white } from "../../assets/colors/colors"
import { createAnnouncement } from "../../firebase/ManageAnnouncements"
import { createEvent } from "../../firebase/ManageEvents"
import InputField from "../../components/InputField/InputField"
import MyDateInputComponent from "../../components/DatePicker/DatePicker"
import { RegistrationContext } from "../../contexts/RegistrationContext"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Point } from "react-native-maps"
import { getUserData, updateUserEvents } from "../../firebase/User"
import {
  showErrorToast,
  showSuccessToast,
} from "../../components/ToastMessage/toast"
import { getAuth } from "firebase/auth"
import { User } from "../../types/User"
import { BackArrow } from "../../components/BackArrow/BackArrow"

interface EventCreationScreenProps {
  navigation: NavigationProp<ParamListBase>
}

const EventCreationScreen = ({ navigation }: EventCreationScreenProps) => {
  const route = useRoute()
  const isAnnouncement = route.params?.isAnnouncement

  const [dateModal, setDateModal] = useState(false)
  const [date, setDate] = useState<Date>(new Date())
  const [hasBeenTouched, setHasBeenTouched] = useState(false)
  const [title, setTitle] = useState("")
  const [location, setLocation] = useState("")
  const [point, setPoint] = useState<Point | undefined>(undefined)
  const insets = useSafeAreaInsets()
  const {
    description,
    setDescription,
    selectedInterests,
    setSelectedInterests,
  } = useContext(RegistrationContext)
  const userId = getAuth().currentUser?.uid
  const [user, setUser] = useState<User | null>(null)
  const [, setLoading] = useState(false)

  const opacity = !hasBeenTouched ? 0.2 : 1

  const publish = async () => {
    // send the data to the backend

    if (isAnnouncement) {
      newAnnouncement()
    } else {
      newEvent()
    }

    // after the user has filled out the form
    // we should make sure the global state is cleaned
    setDescription("")
    setSelectedInterests([])
  }

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
    if (!point) {
      console.log("Need a point to create an event")
      setPoint(undefined)
      console.log("Event not created")
      showErrorToast("You must enter a location for an event")
      return
    }
    const eventId = await createEvent(
      title,
      description,
      date.toISOString(),
      point,
      location,
      "imageUrl",
      userId
    )
    if (eventId && user) {
      await updateUserEvents(user.uid, eventId)
      showSuccessToast("Event created successfully")
    }
  }

  const newAnnouncement = async () => {
    try {
      await createAnnouncement(
        title,
        location,
        point,
        description,
        selectedInterests,
        date.toISOString()
      )
      showSuccessToast("Announcement created succesfully")
    } catch (error) {
      showErrorToast("Could not create announcement")
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 5 }]}>
        <BackArrow />
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
            Choose up to three interests
          </Text>

          <Pressable
            onPress={() => {
              navigation.navigate("Interests")
              setSelectedInterests([])
            }}
          >
            <View style={styles.tags}>
              <View style={styles.addTag}>
                {selectedInterests?.length === 0 ? (
                  <Ionicons name="add" size={24} color={white} />
                ) : (
                  <Ionicons name="refresh" size={24} color={white} />
                )}
              </View>
              {selectedInterests?.length !== 0 && (
                <Text style={[styles.tagsTitle, globalStyles.text]}>
                  Interests selected!
                </Text>
              )}
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
              onPress={() => {
                const onLocationChange = (locationName: string, point: Point | undefined) => {
                  setLocation(locationName)
                  setPoint(point)
                }
                navigation.navigate("SelectLocation", {onLocationChange: onLocationChange, initialPoint: point})
              }}
              style={globalStyles.boldText}
            >
              {point === undefined ? "Add a location" : "Modify location"}
            </Text>
          </Pressable>
          <Pressable style={styles.buttonBase}>
            <Text
              onPress={() => {
                navigation.navigate("Description" as never)
              }}
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
