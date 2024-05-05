import React, { useEffect } from 'react'
import { View, Text, TextInput, SectionList, SectionListRenderItemInfo } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import EventCard from '../../../components/EventCard/EventCard'
import  {styles} from './../stylesScreen' // Ensure the paths are correct
import { useNavigation } from '@react-navigation/native'

import { Ionicons } from "@expo/vector-icons"
import { defautlBackgroundColor, lightPeach } from '../../../assets/colors/colors'
import { getAllFutureEvents, getAllPastEvents } from '../../../firebase/ManageEvents'
import { showErrorToast } from '../../../components/ToastMessage/toast'
import { Event } from '../../../types/Event'

interface EventsScreenProps {
  onEventPress: (announcement: Event) => void
}

const EventScreen = ({ onEventPress }: EventsScreenProps) => {
  
  const navigation = useNavigation()

  const [futureEvents, setFutureEvents] = React.useState<Event[] | null>([])
  const [pastEvents, setPastEvents] = React.useState<Event[] | null>([])
  
  const [filteredFutureEvents, setFilteredFutureEvents] = React.useState<Event[] | null>([])
  const [filteredPastEvents, setFilteredPastEvents] = React.useState<Event[] | null>([])

  const [ searchQuery, setSearchQuery ] = React.useState("")

  const handleSearch = (search: string) => {
    setSearchQuery(search)
    if (futureEvents === null || pastEvents === null) return
    setFilteredFutureEvents(futureEvents.filter(event => event.title.toLowerCase().includes(searchQuery.toLowerCase())))
    setFilteredPastEvents(pastEvents.filter(event => event.title.toLowerCase().includes(searchQuery.toLowerCase())))
  }
  useEffect(() => {
    const loadEvents = async () => {
      try {
        const fetchedFutureEvents = await getAllFutureEvents() 
        const fetchedPastEvents = await getAllPastEvents()
        

        setFutureEvents(fetchedFutureEvents)
        setPastEvents(fetchedPastEvents)

        setFilteredFutureEvents(fetchedFutureEvents)
        setFilteredPastEvents(fetchedPastEvents)
        
      }
      catch (error) {
        showErrorToast("Error fetching events. Please check your connection and try again.")
      }
    }

    loadEvents()
  }, [])

  const sections = [
    { title: "Future Events", data: filteredFutureEvents },
    { title: "Past Events", data: filteredPastEvents }
  ]

   const renderItem = ({ item }: SectionListRenderItemInfo<Event>) => (
    //Need to add the onPress function to navigate to the event page
    <TouchableOpacity
      onPress={() => {onEventPress(item)} }
      >
        <EventCard {...item} />
    </TouchableOpacity>
  ) 

  const renderSectionHeader = (info : {section: typeof sections[number]} ) => (
    <View style={{ backgroundColor: defautlBackgroundColor}} >
    <Text style={styles.header}>{info.section.title}</Text>
    <View style={styles.separationBar} />
    </View>
  )

  return (
    <View style={styles.view}>
      <View style={styles.searchAndMap}>
        <TextInput
          placeholder="Search..."
          style={styles.input}
          onChangeText={handleSearch}
        />
        <TouchableOpacity
          style={styles.map}
          onPress={() => navigation.navigate("EventMap", {events: filteredFutureEvents})}
        >
          <Text>Map View</Text>
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity onPress={() => navigation.navigate("EventCreation" as never) }>
      <View style={styles.button}>
            <Ionicons name="add" size={24} color={lightPeach}  />
        </View>
      </TouchableOpacity>

      <View style={styles.containerEvent}>
        <SectionList
          sections={sections}
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
        />
      </View> 
    </View>
  )
}

export default EventScreen
