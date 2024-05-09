import React, { useEffect } from 'react'
import { View, Text, TextInput, SectionList, SectionListRenderItemInfo, SectionListData, DefaultSectionT } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import EventCard from '../../../components/EventCard/EventCard'
import  {styles} from './../stylesScreen' // Ensure the paths are correct
import {  useNavigation } from '@react-navigation/native'

import { Ionicons } from "@expo/vector-icons"
import { defaultBackgroundColor, lightPeach } from '../../../assets/colors/colors'
import { getAllFutureEvents, getAllPastEvents } from '../../../firebase/ManageEvents'
import { showErrorToast } from '../../../components/ToastMessage/toast'
import { Event } from '../../../types/Event'

interface EventsScreenProps {
  onEventPress: (announcement: Event) => void
}

const EventScreen = ({ onEventPress }: EventsScreenProps) => {
  
  const navigation = useNavigation()

  const [futureEvents, setFutureEvents] = React.useState<Event[] >([])
  const [pastEvents, setPastEvents] = React.useState<Event[] >([])
  
  const [filteredFutureEvents, setFilteredFutureEvents] = React.useState<Event[]>([])
  const [filteredPastEvents, setFilteredPastEvents] = React.useState<Event[] >([])

  const [sections, setSections] = React.useState<SectionListData<Event[], DefaultSectionT>[]>([])

  const [ searchQuery, setSearchQuery ] = React.useState("")

  useEffect(
    () => {
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
      
    }}

    loadEvents()
  }, [])

  useEffect(() => {
    

    if (searchQuery) {
      setFilteredFutureEvents(futureEvents.filter((event: { title: string }) => event.title.toLowerCase().includes(searchQuery.toLowerCase())))
      setFilteredPastEvents(pastEvents.filter((event: { title: string }) => event.title.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    } else {

        
      setFilteredFutureEvents(futureEvents)
      setFilteredPastEvents(pastEvents)
    }

  }, [searchQuery])

  useEffect(() => {
    setSections([
      { title: "Future Events", data: groupEventsByTwo(filteredFutureEvents) },
      { title: "Past Events", data: groupEventsByTwo(filteredPastEvents) }
    ])
  }, [filteredFutureEvents, filteredPastEvents])

  

  function groupEventsByTwo(events: Event[]) {
    const grouped = []
    for (let i = 0; i < events.length; i += 2) {
      // Check if there is a pair to push, if not push the last single event with a dummy event
      if (i + 1 < events.length) {
        grouped.push([events[i], events[i + 1]])
      } else {
        // Push the last item with a dummy transparent item
        grouped.push([events[i], { uid: 'dummy' + i, title: "dummy"} as Event])
      }
    }
    return grouped
  }
  
  


  const renderItem = ({ item }: SectionListRenderItemInfo<Event[]>) => (
    <View style={styles.row}>
      {item.map((event) => (
        <TouchableOpacity 
          key={event.uid}  // Ensure each child has a unique key
          style={[styles.cardContainer, event.title === "dummy" ? styles.transparent : {}]}
          disabled={event.title === "dummy"}
        >
          <EventCard {...event} />
        </TouchableOpacity>
      ))}
    </View>
  )
  

  const renderSectionHeader = (info : {section: SectionListData<Event[], DefaultSectionT>} ) => {
    return (
      <View style={{ backgroundColor: defaultBackgroundColor}} >
      <Text style={styles.header}>{info.section.title}</Text>
      <View style={styles.separationBar} />
      </View>
    )
  }

  return (
    <View style={styles.view}>
      <View style={styles.searchAndMap}>
        <TextInput
          placeholder="Search..."
          style={styles.input}
          onChangeText={setSearchQuery}
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
          stickySectionHeadersEnabled={true}
          renderSectionHeader={renderSectionHeader}
          
          
        />
      </View> 
    </View>
  )
}

export default EventScreen
