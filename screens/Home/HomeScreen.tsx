import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
} from "react-native"

import { styles } from "./styles"
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import EventCard from "../../components/EventCard/EventCard"
import { globalStyles } from "../../assets/global/globalStyles"
import { useNavigation } from "@react-navigation/native"
import React from "react"
// will need to import it from the database later

export interface event {
  title: string
  location: string
  latitude: number
  longitude: number
  description: string
  date: string
  imageUrl: string
}

const events = [
  {
    title: "Balelek 2023",
    location: "EPFL, Agora",
    latitude: 46.51858962578904,
    longitude: 6.566048509782951,
    description: "Music festival 2023",
    date: "2023-04-04", // changed to YYYY-MM-DD format
    imageUrl: "https://balelec.ch/uploads/2023_f4caf642b6.jpg",
  },
  {
    title: "Event 2",
    location: "EPFL, CM",
    latitude: 46.51859297638995, 
    longitude: 6.563141941352757,
    description: "Agepoly",
    date: "2022-08-04", // changed to YYYY-MM-DD format
    imageUrl: "https://example.com/image.png",
  },
  {
    title: "Balelek 2024",
    location: "EPFL, Agora",
    latitude: 46.51992048733761,
    longitude: 6.565926796074852,
    description: "Music festival 2024",
    date: "2024-05-20", // changed to YYYY-MM-DD format
    imageUrl: "https://example.com/image.png",
  },
  {
    title: "Graduation 2025",
    location: "EPFL, Swisstech",
    latitude: 46.52277976263842,
    longitude: 6.565209257647138,
    description: "Graduation",
    date: "2025-06-04", // changed to YYYY-MM-DD format
    imageUrl: "https://example.com/image.png",
  },
]

const HomeScreen = () => {
  const insets = useSafeAreaInsets()
  const navigation = useNavigation()
  //const [title, setTitle] = React.useState("Future")

  const [searchQuery, setSearchQuery] = React.useState("")
  // Filter events based on the current date and search query
  const getFilteredEvents = (isFutureEvent: boolean) => {
    const currentDate = new Date("2024-04-20")

    // Filter events based on date
    const eventsFilteredByDate = events.filter((event) => {
      const eventDate = new Date(event.date)
      return isFutureEvent ? eventDate >= currentDate : eventDate < currentDate
    })

    // Further filter by search query if there is one
    return eventsFilteredByDate.filter((event) =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }

  const futureEvents = getFilteredEvents(true)
  const pastEvents = getFilteredEvents(false)

  const handleSearch = (search: string) => {
    setSearchQuery(search)
  }
  // Can be replaced by EventCardProps later
  const renderEvents = (event: {
    title: string
    location: string
    latitude: number
    longitude: number
    description: string
    date: string
    imageUrl: string
  }) => (
    <TouchableOpacity>
      <EventCard
        title={event.title}
        location={event.location}
        latitude={event.latitude}
        longitude={event.longitude}
        description={event.description}
        date={event.date}
        imageUrl={event.imageUrl}
        // Should redirect to an event dedicated page where the user can register for the event
      />
    </TouchableOpacity>
  )

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View
        style={[
          styles.view,
          { paddingBottom: insets.bottom, paddingTop: insets.top },
        ]}
      >
        {/* Add the choose tab component from Gael pull request */}
        <View style={styles.searchAndMap}>
          <View>
            <TextInput
              placeholder="Search..."
              style={[styles.input, globalStyles.text]}
              onChangeText={handleSearch}
            />
          </View>
          <TouchableOpacity
            style={styles.map}
            onPress={() =>
              navigation.navigate("EventMap", { events })
            }
          >
            <Text> Show on the Map</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.containerEvent}>
          <Text style={styles.title}>Futur Events</Text>
          <ScrollView style={styles.eventList}>
            {/* Add the event card componrent */}
            {futureEvents.map((event) => renderEvents(event))}
            <Text style={styles.title}>Past Events </Text>
            {/* Add the events card component Need a way to differentiate from past and futur event */}
            {pastEvents.map((event) => renderEvents(event))}
          </ScrollView>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default HomeScreen
