import React, { useEffect, useState } from 'react'
import { View, Text, SectionList, SectionListRenderItemInfo, TouchableOpacity, TextInput } from 'react-native'
import { styles } from './styles' // Ensure the paths are correct
import AnnouncementCard from '../../../components/AnnoucementCard/AnnouncementCard'
import { Announcement } from '../../../types/Annoucement'
import { getAllAnnouncements } from '../../../firebase/ManageAnnouncements'
import { showErrorToast } from '../../../components/ToastMessage/toast'
import LoadingScreen from '../../Loading/LoadingScreen'

interface AnnouncementsScreenProps {
  onAnnouncementPress: (announcement: Announcement) => void
}

const AnnouncementScreen = ({ onAnnouncementPress }: AnnouncementsScreenProps) => {

  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [filteredAnnouncements, setFilteredAnnouncements] = useState<Announcement[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedAnnouncements = await getAllAnnouncements() || [] // Fallback to an empty array if null
        setAnnouncements(fetchedAnnouncements)
        setFilteredAnnouncements(fetchedAnnouncements)
        setIsLoading(false)
      } catch (error) {
        showErrorToast("Error fetching announcements. Please check your connection and try again.")
        setIsLoading(false) // Set loading to false regardless of result
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    if (searchQuery) {
      setFilteredAnnouncements(announcements.filter((announcement: { title: string }) =>
        announcement.title.toLowerCase().includes(searchQuery.toLowerCase())
      ))
    } else {
      setFilteredAnnouncements(announcements)
    }
  }, [searchQuery, announcements])

  const sections = [{ title: "Future Announcements", data: filteredAnnouncements }]

  const handleSearch = (search: string) => {
    setSearchQuery(search)
  }

  const renderItem = ({ item }: SectionListRenderItemInfo<Announcement>) => (
    <TouchableOpacity onPress={() => { onAnnouncementPress(item) }}>
      <AnnouncementCard {...item} />
    </TouchableOpacity>
  )

  if (isLoading) {
    // Display a loading indicator while data is fetching
    return <LoadingScreen />
  }

  if (announcements.length === 0) {
    // Display a message if there are no announcements
    return <Text>No future announcements available.</Text>
  }

  return (
    <View style={styles.view}>
      <View style={styles.searchAndMap}>
        <TextInput
          style={styles.input}
          placeholder="Search..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
        
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
