import { View, Text, TouchableWithoutFeedback, Keyboard, TextInput } from 'react-native'

import { styles } from './styles'
import React = require('react')
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { useSafeAreaInsets } from 'react-native-safe-area-context'


import EventCard from '../../components/EventCard/EventCard'
import { globalStyles } from '../../assets/global/globalStyles'
// will need to import it from the database later


const events = [
  {
    title: "Balelek 2023",
    location: "EPFL, Agora",
    description: "Music festival",
    date: "04.04.2023",
    imageUrl: "https://balelec.ch/uploads/2023_f4caf642b6.jpg",
  },
  {
    title: "Event 2",
    location: "EPFL, Agora",
    description: "Agepoly",
    date: "04.08.2022",
    imageUrl: "https://example.com/image.png",
  },
  {
    title: "Balelek 2024",
    location: "EPFL, Agora",
    description: "Music festival",
    date: "20.05.2024",
    imageUrl: "https://example.com/image.png",
  },
  {
    title: "Graduation 2025",
    location: "EPFL, Swisstech",
    description: "Music festival",
    date: "04.06.2025",
    imageUrl: "https://example.com/image.png",
  },
  
]

const HomeScreen = () => {

  const insets = useSafeAreaInsets()
  //const navigation = useNavigation() Later for the redirection to a specific event page
  
  const [filteredEvents, setFilteredEvents] = React.useState(events)

  // Can be replaced by EventCardProps later
  const renderEvents = ( event: { title: string; location: string; description: string; date: string; imageUrl: string }  ) => (
    <TouchableOpacity>
    <EventCard
      title={event.title}
      location={event.location}
      description={event.description}
      date={event.date}
      imageUrl={event.imageUrl}
      // Should redirect to an event dedicated page where the user can register for the event
    />
    </TouchableOpacity>
  )

  const handleSearch = (search: string) => {
    const filtered = events.filter((event) => event.title.toLowerCase().includes(search.toLowerCase()))
    setFilteredEvents(filtered)
  }


  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    <View style={[
          styles.view,
          { paddingBottom: insets.bottom, paddingTop: insets.top },
        ]} >
      {/* Add the choose tab component from Gael pull request */}
      <View style={styles.searchAndMap}>
      <View>
          <TextInput
            placeholder="Search"
            style={[styles.input, globalStyles.text]}
            onChangeText={handleSearch}
          />
        </View>
        <TouchableOpacity style={styles.map}>
          <Text> Show on the Map</Text>
        </TouchableOpacity>

      </View>

      <View style={styles.containerEvent}>
        <Text style={styles.title}>Future Events</Text>
        <ScrollView style={styles.eventList}>
          {/* Add the event card component */}
          {filteredEvents.map((event) => (
            renderEvents(event)
          ))}
      </ScrollView>
      </View>

      <View style={styles.containerEvent}>
          
      <Text style={styles.title}>Future Events</Text>
      <ScrollView style={styles.eventList}>
        {/* Add the events card component Need a way to differentiate from past and futur event */}
        {filteredEvents.map((event) => (
          renderEvents(event)
        ))}
      </ScrollView>
    </View>

    </View>
    </TouchableWithoutFeedback>
  )
}

export default HomeScreen