import React, { useEffect } from 'react'
import { View, Text, TextInput, SectionList, SectionListRenderItemInfo, Pressable, DefaultSectionT, SectionListData } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import EventCard from '../../../components/EventCard/EventCard'
import  {styles} from './styles'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from "@expo/vector-icons"
import { getAllFutureEvents, getAllPastEvents } from '../../../firebase/ManageEvents'
import { showErrorToast } from '../../../components/ToastMessage/toast'
import { Event } from '../../../types/Event'
import { globalStyles } from '../../../assets/global/globalStyles'
import LoadingScreen from '../../Loading/LoadingScreen'
import { StackNavigationProp } from '@react-navigation/stack'

type RootStackParamList = {
  EventMap: {
      events: Event[] | null
  }
}

const EventScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()
  const [futureEvents, setFutureEvents] = React.useState<Event[] | null>([])
  const [pastEvents, setPastEvents] = React.useState<Event[] | null>([])
  const [filteredFutureEvents, setFilteredFutureEvents] = React.useState<Event[] | null>([])
  const [filteredPastEvents, setFilteredPastEvents] = React.useState<Event[] | null>([])
  const [ searchQuery, setSearchQuery ] = React.useState("")
  const [loading, setLoading] = React.useState(true)

  const handleSearch = (search: string) => {
    setSearchQuery(search)
    if (futureEvents === null || pastEvents === null) return
    setFilteredFutureEvents(futureEvents.filter(event => event.title.toLowerCase().includes(searchQuery.toLowerCase())))
    setFilteredPastEvents(pastEvents.filter(event => event.title.toLowerCase().includes(searchQuery.toLowerCase())))
  }
  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true)
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
      finally {
        setLoading(false)
      }
    }

    loadEvents()
  }, [])

  const sections = [
    { title: "Future Events", data: filteredFutureEvents },
    { title: "Past Events", data: filteredPastEvents }
  ]

   const renderItem = ({ item }: SectionListRenderItemInfo<Event>) => (
    <EventCard {...item} />
  ) 

  const renderSectionHeader = (info: { section: SectionListData<Event, DefaultSectionT> }) => (
    <View style={styles.sectionHeader} >
      <Text style={[globalStyles.boldText, styles.header]}>{info.section.title}</Text>
      <Pressable onPress={() => navigation.navigate("EventCreation" as never)} style={styles.iconText}>
        <Text style={[globalStyles.smallText, styles.text]}>Create an event</Text>
        <Ionicons name="create-outline" size={16}/>
      </Pressable>
    </View>
  )

  if (loading) return (
    <LoadingScreen/>
  )

  return (
    <View style={styles.view}>
      <View style={styles.searchAndMap}>
        <TextInput
          placeholder="Search..."
          style={styles.input}
          onChangeText={handleSearch}
          value={searchQuery}
        />
        <TouchableOpacity
          style={styles.map}
          onPress={() => navigation.navigate("EventMap", {events: filteredFutureEvents})}
        >
          <Text style={globalStyles.boldText}>Map View</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.containerEvent}>
        <SectionList
          sections={sections as SectionListData<Event, DefaultSectionT>[]}
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
          showsVerticalScrollIndicator={false}
          stickySectionHeadersEnabled={false}
        />
      </View> 
    </View>
  )
}

export default EventScreen
