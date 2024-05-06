import React, { useState } from 'react'
import { View, Text, TextInput, SectionList, SectionListRenderItemInfo, Pressable } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { styles } from './styles'// Ensure the paths are correct
import AnnouncementCard from '../../../components/AnnoucementCard/AnnouncementCard'
import { Announcement } from '../../../types/Annoucements'
import { Ionicons } from '@expo/vector-icons'
import { globalStyles } from '../../../assets/global/globalStyles'
import { white } from '../../../assets/colors/colors'


const announcements : Announcement[] = 
  [
    {
      uid: "1",
      title: "Balelek 2023",
      location: "EPFL, Agora",
      description: "Music festival 2023",
      date: "2024-04-04",
      interests: []
    },
    {
      uid: "2",
      title: "Event 2",
      location: "EPFL, CM",
      description: "Agepoly",
      date: "2024-08-04",
      interests: []
    },
    {
      uid: "3",
      title: "Balelek 2024",
      location: "EPFL, Agora",
      description: "Music festival 2024",
      date: "2024-05-20",
      interests: ["Friends", "Music", "Food", "Games"]
    },
    {
      uid: "4",
      title: "Graduation 2025",
      location: "EPFL, Swisstech",
      description: "Graduation",
      date: "2025-06-04",
      interests: ["Party", "Music", "Food", "Games"]
    },
    {
      uid: "5",
      title: "Graduation 2026",
      location: "EPFL, Swisstech",
      description: "Graduation",
      date: "2026-06-04",
      interests: ["Music", "Food", "Games"]
    },
]

const AnnouncementScreen = () => {
  
  const [searchQuery, setSearchQuery] = useState("")

  const getFutureAnnouncements = () => {
    const currentDate = new Date()
    return announcements.filter(announcement => {
      const announcementDate = new Date(announcement.date)
      return announcementDate >= currentDate
    }).filter(announcement => announcement.title.toLowerCase().includes(searchQuery.toLowerCase()))
  }

  const handleSearch = (search: string) => {
    setSearchQuery(search)
  }

  const renderItem = ({ item }: SectionListRenderItemInfo<Announcement>) => (
    <TouchableOpacity >
      <AnnouncementCard {...item} />
    </TouchableOpacity>
  )

  return (
    <View style={styles.view}>
      <View style={styles.searchAndMap}>
        <TextInput
          style={styles.input}
          placeholder="Search..."
          onChangeText={handleSearch}
          value={searchQuery}
        />
        <Pressable style={styles.button}>
          <Text style={[globalStyles.smallText, styles.text]}>Create</Text>
          <Ionicons name="create-outline" size={18} color={white}/>
        </Pressable>
      </View>
      <View style={styles.container}>
        <SectionList
          sections={[{ title: "Announcements", data: getFutureAnnouncements() }]}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          stickySectionHeadersEnabled={false}
        />
      </View>
    </View>
  )
}

export default AnnouncementScreen
