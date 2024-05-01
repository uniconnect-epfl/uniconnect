import {
  View,
  Text,
  TextInput,
} from "react-native"

import { styles } from "./styles"
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import EventCard from "../../components/EventCard/EventCard"
import { globalStyles } from "../../assets/global/globalStyles"
import { useNavigation } from "@react-navigation/native"
import React, { useEffect } from "react"
import { Event } from "../../types/Event"
import { getAllPastEvents, getAllFutureEvents } from "../../firebase/ManageEvents"
import { showErrorToast } from "../../components/ToastMessage/toast"
// will need to import it from the database later


const HomeScreen = () => {
  const insets = useSafeAreaInsets()
  const navigation = useNavigation()
  const [futureEvents, setFutureEvents] = React.useState<Event[] | null>([])
  const [pastEvents, setPastEvents] = React.useState<Event[] | null>([])

  const [ setSearchQuery] = React.useState("")

  const handleSearch = (search: string) => {
    setSearchQuery(search)
  }
  useEffect(() => {
    const loadEvents = async () => {
      try {
        const fetchedFutureEvents = await getAllFutureEvents() 
        const fetchedPastEvents = await getAllPastEvents() 

        setFutureEvents(fetchedFutureEvents)
        setPastEvents(fetchedPastEvents)
      }
      catch (error) {
        showErrorToast("Error fetching events. Please check your connection and try again.")
      }
    }

    loadEvents()
  }, [])

  const renderEvents = (isFuture: boolean) => {
    const events: Event[] = isFuture ? futureEvents : pastEvents
    return events.map((event: Event) => (
      <TouchableOpacity key={event.title}>
        <EventCard event={event} />
      </TouchableOpacity>
    ))
  }

  return (
    //<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
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
        {/* Need to style the opacity to render it smaller*/}
        <TouchableOpacity
          style={styles.map}
          onPress={() =>
            navigation.navigate("EventMap",  { events: futureEvents })
          }
        >
          <Text> Show on the Map</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.containerEvent}>
        <Text style={styles.title}>Future Events</Text>
        <ScrollView style={styles.eventList}>
          { }
          {
            renderEvents(true)
          }
        </ScrollView>
        <Text style={styles.title}>Past Events</Text>
        <ScrollView style={styles.eventList}>
          { }
          {
            renderEvents(false)
          }
        </ScrollView>
      </View>
    </View>
    //</TouchableWithoutFeedback>
  )

}
export default HomeScreen
