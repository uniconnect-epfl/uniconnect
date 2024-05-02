import React, { useEffect } from 'react'
import { View, Text, TextInput, SectionList, SectionListRenderItemInfo, SectionListData } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import EventCard, { EventCardProps } from '../../../components/EventCard/EventCard'
import  {styles} from './styles' // Ensure the paths are correct
import { useNavigation } from '@react-navigation/native'

import { Ionicons } from "@expo/vector-icons"
import { lightPeach } from '../../../assets/colors/colors'
import { getAllFutureEvents, getAllPastEvents } from '../../../firebase/ManageEvents'
import { showErrorToast } from '../../../components/ToastMessage/toast'

interface EventScreenProps {
  onEventPress: (uid: string) => void
  events: EventCardProps[]
}

const EventScreen = ({ events, onEventPress  }: EventScreenProps) => {
  
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

  const sections = [
    { title: "Future Events", data: futureEvents },
    { title: "Past Events", data: pastEvents }
  ]

  const renderItem = ({ item }: SectionListRenderItemInfo<EventCardProps>) => (
    <TouchableOpacity onPress={() => onEventPress(item.event.uid)}>
    <EventCard eventCard={item} />
    </TouchableOpacity>
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
          keyExtractor={(item, index) => item.event.uid + index.toString()}
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
        />
      </View>
    </View>
  )
}

export default EventScreen
