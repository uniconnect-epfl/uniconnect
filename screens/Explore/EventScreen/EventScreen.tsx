import React, { useCallback, useEffect } from "react"
import {
  View,
  Text,
  SectionList,
  SectionListRenderItemInfo,
  Pressable,
  DefaultSectionT,
  SectionListData,
  TouchableOpacity,
} from "react-native"
import EventCard from "../../../components/EventCard/EventCard"
import { styles } from "./styles"
import { useNavigation, useFocusEffect } from "@react-navigation/native"
import { Ionicons } from "@expo/vector-icons"
import {
  getAllFutureEvents,
  getAllPastEvents,
} from "../../../firebase/ManageEvents"
import { showErrorToast } from "../../../components/ToastMessage/toast"
import { Event } from "../../../types/Event"
import { globalStyles } from "../../../assets/global/globalStyles"
import LoadingScreen from "../../Loading/LoadingScreen"
import { StackNavigationProp } from "@react-navigation/stack"

import InputField from "../../../components/InputField/InputField"
import { fetchAllUserImages, getUserData } from "../../../firebase/User"

interface EventsScreenProps {
  onEventPress: (event: Event) => void
  userID?: string
}

type RootStackParamList = {
  EventMap: {
    onEventPress: (event: Event) => void
    events: Event[] | null
  }
}

const EventScreen = ({ onEventPress, userID }: EventsScreenProps) => {

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()
  const [futureEvents, setFutureEvents] = React.useState<Event[]>([])
  const [pastEvents, setPastEvents] = React.useState<Event[]>([])
  const [filteredFutureEvents, setFilteredFutureEvents] = React.useState<
    Event[]
  >([])
  const [filteredPastEvents, setFilteredPastEvents] = React.useState<Event[]>(
    []
  )
  const [sections, setSections] = React.useState<
    SectionListData<Event[], DefaultSectionT>[]
  >([])
  const [searchQuery, setSearchQuery] = React.useState("")
  const [loading, setLoading] = React.useState(true)

  const [userImages, setUserImages] = React.useState(
    {} as Record<string, string>
  )
  const loadEvents = useCallback(async () => {
    try {
      setLoading(true)
      if (userID) {

        const userData = await getUserData(userID)
        
        if (userData) {
          const userEvents = userData.events
          const fetchedFutureEvents = await getAllFutureEvents()
          const fetchedPastEvents = await getAllPastEvents()

          const userFutureEvents = fetchedFutureEvents.filter((event) =>
            userEvents.includes(event.uid)
          )
          const userPastEvents = fetchedPastEvents.filter((event) =>
            userEvents.includes(event.uid)
          )

          setFutureEvents(userFutureEvents)
          setPastEvents(userPastEvents)

          setFilteredFutureEvents(userFutureEvents)
          setFilteredPastEvents(userPastEvents)
            if (userFutureEvents.length === 0 && userPastEvents.length === 0) {
              showErrorToast("You have no events yet.")
            }
          }
          const userImages = await fetchAllUserImages()
          if(userImages) {
            setUserImages(userImages)
          }
        } else {
          const fetchedFutureEvents = await getAllFutureEvents()
          const fetchedPastEvents = await getAllPastEvents()

        setFutureEvents(fetchedFutureEvents)
        setPastEvents(fetchedPastEvents)

          setFilteredFutureEvents(fetchedFutureEvents)
          setFilteredPastEvents(fetchedPastEvents)
          if (fetchedFutureEvents.length === 0 && fetchedPastEvents.length === 0) {
            showErrorToast("You have no events yet.")
          }
          const userImages = await fetchAllUserImages()
          if(userImages) {
            setUserImages(userImages)
          }
        }
      } catch (error) {
        showErrorToast(
          "Error fetching events. Please check your connection and try again."
        )
      } finally {
        setLoading(false)
      }
    }, [userID])

  useFocusEffect(
    useCallback(() => {
      loadEvents()
    }, [loadEvents])
  )

  const renderSectionHeader = (info: {
    section: SectionListData<Event[], DefaultSectionT>
  }) => (
    <View style={styles.sectionHeader}>
      <Text style={[globalStyles.boldText, styles.header]}>
        {info.section.title}
      </Text>
      {info.section.title === "Upcoming Events" && (
        <Pressable
          onPress={() => navigation.navigate("EventCreation" as never)}
          style={styles.iconText}
        >
          <Text style={[globalStyles.smallText, styles.text]}>
            Create an event
          </Text>
          <Ionicons name="create-outline" size={16} />
        </Pressable>
      )}
    </View>
  )

  useEffect(() => {
    if (searchQuery) {
      setFilteredFutureEvents(
        futureEvents.filter((event: { title: string }) =>
          event.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
      setFilteredPastEvents(
        pastEvents.filter((event: { title: string }) =>
          event.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    } else {
      setFilteredFutureEvents(futureEvents)
      setFilteredPastEvents(pastEvents)
    }
  }, [searchQuery, futureEvents, pastEvents])

  useEffect(() => {
    setSections([
      {
        title: "Upcoming Events",
        data: groupEventsByTwo(filteredFutureEvents),
      },
      { title: "Past Events", data: groupEventsByTwo(filteredPastEvents) },
    ])
  }, [filteredFutureEvents, filteredPastEvents])

  function groupEventsByTwo(events: Event[]) {
    const grouped = []
    for (let i = 0; i < events.length; i += 2) {
      if (i + 1 < events.length) {
        grouped.push([events[i], events[i + 1]])
      } else {
        grouped.push([events[i], { uid: "dummy" + i, title: "dummy" } as Event])
      }
    }
    return grouped
  }

  const renderItem = ({ item }: SectionListRenderItemInfo<Event[]>) => (
    <View style={styles.row}>
      {item.map((event) => (
        <TouchableOpacity
          key={event.uid}
          style={[
            styles.cardContainer,
            event.title === "dummy" ? styles.transparent : {},
          ]}
          onPress={() => {
            onEventPress(event)
          }}
          disabled={event.title === "dummy"}
          testID={"event-card-" + event.title}
        >
          <EventCard event={event} userImages={userImages} />
        </TouchableOpacity>
      ))}
    </View>
  )

  if (loading) return <LoadingScreen />

  return (
    <View style={styles.view}>
      <View style={styles.searchAndMap}>
        <InputField
          placeholder="Search..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={() => {}}
        />
        <TouchableOpacity
          style={styles.map}
          onPress={() =>
            navigation.navigate("EventMap", {
              onEventPress: onEventPress,
              events: filteredFutureEvents,
            })
          }
        >
          <Text style={globalStyles.boldText}>Map View</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.containerEvent}>
        <SectionList
          sections={sections}
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
          showsVerticalScrollIndicator={false}
          stickySectionHeadersEnabled={true}
        />
      </View>
    </View>
  )
}

export default EventScreen
