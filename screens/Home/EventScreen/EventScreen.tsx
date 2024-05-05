import React, { useEffect } from 'react'
import { View, Text, TextInput, SectionList, SectionListRenderItemInfo, SectionListData, DefaultSectionT } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import EventCard from '../../../components/EventCard/EventCard'
import  {styles} from './../stylesScreen' // Ensure the paths are correct
import { useNavigation } from '@react-navigation/native'

import { Ionicons } from "@expo/vector-icons"
import { defautlBackgroundColor, lightPeach } from '../../../assets/colors/colors'
import { getAllFutureEvents, getAllPastEvents } from '../../../firebase/ManageEvents'
import { showErrorToast } from '../../../components/ToastMessage/toast'
import { Event } from '../../../types/Event'


const EventScreen = () => {
  
  const navigation = useNavigation()

  const [futureEvents, setFutureEvents] = React.useState<Event[] | null>([])
  const [pastEvents, setPastEvents] = React.useState<Event[] | null>([])
  
  const [filteredFutureEvents, setFilteredFutureEvents] = React.useState<Event[] | null>([])
  const [filteredPastEvents, setFilteredPastEvents] = React.useState<Event[] | null>([])

  const [ searchQuery, setSearchQuery ] = React.useState("")

  const handleSearch = (search: string) => {
    setSearchQuery(search)
    if (futureEvents === null || pastEvents === null) return
    setFilteredFutureEvents(futureEvents.filter((event: { title: string }) => event.title.toLowerCase().includes(searchQuery.toLowerCase())))
    setFilteredPastEvents(pastEvents.filter((event: { title: string }) => event.title.toLowerCase().includes(searchQuery.toLowerCase())))
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

        sections = [
          { title: "Future Events", data: groupEventsByTwo(filteredFutureEvents) },
          { title: "Past Events", data: groupEventsByTwo(filteredPastEvents) }
        ]
        
      }
      catch (error) {
        showErrorToast("Error fetching events. Please check your connection and try again.")
      }
    }

    loadEvents()
  }, [])

  function groupEventsByTwo(events) {
    const grouped = []
    for (let i = 0; i < events.length; i += 2) {
      // Check if there is a pair to push, if not push the last single event with a dummy event
      if (i + 1 < events.length) {
        grouped.push([events[i], events[i + 1]])
      } else {
        // Push the last item with a dummy transparent item
        grouped.push([events[i], { uid: 'dummy', name: '', description: ''}])
      }
    }
    return grouped
  }
  
    
  let sections = [
    { title: "Future Events", data: groupEventsByTwo(filteredFutureEvents) },
    { title: "Past Events", data: groupEventsByTwo(filteredPastEvents) }
  ]

  


  const renderItem = ({ item }: SectionListRenderItemInfo<Event[]>) => (
    <View style={styles.row}>
      {item.map((event) => (
        <TouchableOpacity 
          key={event.uid}  // Ensure each child has a unique key
          style={[styles.cardContainer, event.uid === "dummy" ? styles.transparent : {}]}
          disabled={event.uid === "dummy"}
        >
          <EventCard {...event} />
        </TouchableOpacity>
      ))}
    </View>
  )
  

  const renderSectionHeader = (info : {section: SectionListData<Event[], DefaultSectionT>} ) => {
    return (
      <View style={{ backgroundColor: defautlBackgroundColor}} >
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
          stickySectionHeadersEnabled={true}
          renderSectionHeader={renderSectionHeader}
          
          
        />
      </View> 
    </View>
  )
}

export default EventScreen
