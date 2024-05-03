import React, { useState } from 'react'
import { View, Text, TextInput, SectionList, SectionListRenderItemInfo } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'


import { styles } from './styles'// Ensure the paths are correct

import { Ionicons } from "@expo/vector-icons"
import { defautlBackgroundColor, lightPeach } from '../../../assets/colors/colors'
import AnnouncementCard from '../../../components/AnnoucementCard/AnnouncementCard'
import { Announcement } from '../../../types/Annoucements'


const announcements : Announcement[] = 
  [
    {
      uid: "1",
      title: "Balelek 2023",
      location: "EPFL, Agora",
      description: "Music festival 2023",
      date: "2023-04-04",
      interests: []
    },
    {
      uid: "2",
      title: "Event 2",
      location: "EPFL, CM",
      description: "Agepoly",
      date: "2022-08-04",
      interests: []
    },
    {
      uid: "3",
      title: "Balelek 2024",
      location: "EPFL, Agora",
      description: "Music festival 2024",
      date: "2024-05-20",
      interests: []
    },
    {
      uid: "4",
      title: "Graduation 2025",
      location: "EPFL, Swisstech",
      description: "Graduation",
      date: "2025-06-04",
      interests: []
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


  const sections = [
    { title: "Annoucement", data: getFutureAnnouncements() },
  ]

  const renderSectionHeader = ( info : {section: typeof sections[number]}) => (
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
      </View>
      <>
        <View style={styles.button}>
          <Ionicons name="add" size={24} color={lightPeach}  />
        </View>
      </>

      <View style={styles.containerEvent}>
        <SectionList
          sections={[{ title: "Future Announcements", data: announcements }]}
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
        />
      </View>
    </View>
  )
}

export default AnnouncementScreen
