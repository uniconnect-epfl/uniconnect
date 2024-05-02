import React, { useState } from 'react'
import { View, Text, TextInput, SectionList, SectionListRenderItemInfo, SectionListData } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import EventCard, { EventCardProps } from '../../../components/EventCard/EventCard'
import  {styles} from './styles' // Ensure the paths are correct
import { useNavigation } from '@react-navigation/native'

import { Ionicons } from "@expo/vector-icons"
import { lightPeach } from '../../../assets/colors/colors'

interface EventScreenProps {
  onEventPress: (uid: string) => void
  events: EventCardProps[]
}

const EventScreen = ({ events }: EventScreenProps) => {
  
  const navigation = useNavigation()
  const [searchQuery, setSearchQuery] = useState("")

  const getFilteredEvents = (isFutureEvent: boolean) => {
    const currentDate = new Date()
    return events.filter(event => {
      const eventDate = new Date(event.date)
      const isFuture = eventDate >= currentDate
      return isFutureEvent ? isFuture : !isFuture
    }).filter(event => event.title.toLowerCase().includes(searchQuery.toLowerCase()))
  }

  const handleSearch = (search: string) => {
    setSearchQuery(search)
  }

  const sections = [
    { title: "Future Events", data: getFilteredEvents(true) },
    { title: "Past Events", data: getFilteredEvents(false) }
  ]

  const renderItem = ({ item }: SectionListRenderItemInfo<EventCardProps>) => (
    <EventCard eventCard={item} />
  )

  const renderSectionHeader = ({ section }: { section: SectionListData<EventCardProps> }) => (
    <>
    <Text style={styles.header}>{section.title}</Text>
    <View style={styles.separationBar} />
    </>
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
          onPress={() => navigation.navigate("EventMap", { events })}
        >
          <Text> Map View</Text>
        </TouchableOpacity>
      </View>
      <>
      <View style={styles.button}>
            <Ionicons name="add" size={24} color={lightPeach}  />
        </View>
      </>

      <View style={styles.containerEvent}>
        <SectionList
          sections={sections}
          keyExtractor={(item, index) => item.uid + index.toString()}
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
        />
      </View>
    </View>
  )
}

export default EventScreen
