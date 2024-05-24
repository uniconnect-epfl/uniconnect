import React, { useEffect, useState } from 'react'
import { View, Text, SectionList, SectionListRenderItemInfo, TouchableOpacity, Pressable } from 'react-native'
import { styles } from './styles'// Ensure the paths are correct
import AnnouncementCard from '../../../components/AnnoucementCard/AnnouncementCard'
import { Announcement } from '../../../types/Annoucement'
import { getAllAnnouncements } from '../../../firebase/ManageAnnouncements'
import { showErrorToast } from '../../../components/ToastMessage/toast'
import LoadingScreen from '../../Loading/LoadingScreen'
import { globalStyles } from '../../../assets/global/globalStyles'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

interface AnnouncementsScreenProps {
  onAnnoucmentPress: (announcement: Announcement) => void
}

const AnnouncementScreen = ({ onAnnoucmentPress }: AnnouncementsScreenProps) => {

  //const [searchQuery, setSearchQuery] = useState("")
  const navigation = useNavigation()
  const [isLoading, setIsLoading] = useState(true)
  const [announcements, setAnnouncements] = useState<Announcement[] | null>(null)


  useEffect(() => {
    const fetchData = async () => {
      try {
        const announcements = await getAllAnnouncements() || [] // Fallback to an empty array if null
        setAnnouncements(announcements)
        setIsLoading(false)
      } catch (error) {
        showErrorToast("Error fetching announcements. Please check your connection and try again.")}
      setIsLoading(false) // Set loading to false regardless of result
    }

    fetchData()
  }, [])

  const sections = [{title: "Future Announcements", data: announcements}]

  // const handleSearch = (search: string) => {
  //   setSearchQuery(search)
  // }

  const renderItem = ({ item }: SectionListRenderItemInfo<Announcement>) => (
    <TouchableOpacity
      onPress={() => {onAnnoucmentPress(item)}}>
      <AnnouncementCard {...item} />
    </TouchableOpacity>
  )

  if (isLoading) {
    // Display a loading indicator while data is fetching
    return <LoadingScreen/>
  }

  if (announcements === null) {
    // Display a message if there are no announcements
    return <Text>No future announcements available.</Text>
  }

  return (
    <View style={styles.view}>
      <View style={styles.searchAndMap}>
        <Pressable onPress={() => navigation.navigate("EventCreation" as never)} style={styles.createEventWrapper} >
          <Text style={[globalStyles.smallText, styles.createEvent]}>Create an announcement</Text>
          <Ionicons name="create-outline" size={16} />
        </Pressable>
        {/* <TextInput
          style={styles.input}
          placeholder="Search..."
          onChangeText={handleSearch}
        /> */}
      </View>
      <View style={styles.container}>
        <SectionList
          sections={sections}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          stickySectionHeadersEnabled={false}
        />
      </View>
    </View>
  )
}

export default AnnouncementScreen
