import React, { useState } from 'react'
import { View, Text, TextInput, SectionList, SectionListRenderItemInfo } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'


import { styles } from './styles'// Ensure the paths are correct

import { Ionicons } from "@expo/vector-icons"
import { lightPeach } from '../../../assets/colors/colors'
import AnnouncementCard, { AnnouncementCardProps } from '../../../components/AnnoucementCard/AnnouncementCard'

interface AnnouncementScreenProps {
  onAnnouncementPress: (uid: string) => void;
  announcements: AnnouncementCardProps[];
}

const AnnouncementScreen = ({ announcements, onAnnouncementPress }: AnnouncementScreenProps) => {
  
  const [searchQuery, setSearchQuery] = useState("")

  const getFutureAnnouncements = () => {
    const currentDate = new Date()
    return announcements.filter(announcement => {
      const announcementDate = new Date(announcement.announcement.date)
      return announcementDate >= currentDate
    }).filter(announcement => announcement.announcement.title.toLowerCase().includes(searchQuery.toLowerCase()))
  }

  const handleSearch = (search: string) => {
    setSearchQuery(search)
  }

  const renderItem = ({ item }: SectionListRenderItemInfo<AnnouncementCardProps>) => (
    <TouchableOpacity onPress={() => onAnnouncementPress(item.announcement.uid)}>
      <AnnouncementCard announcement={item.announcement} />
    </TouchableOpacity>
  )

  const renderSectionHeader = ({ section }) => (
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
      </View>
      <>
        <View style={styles.button}>
          <Ionicons name="add" size={24} color={lightPeach}  />
        </View>
      </>

      <View style={styles.containerEvent}>
        <SectionList
          sections={[{ title: "Future Announcements", data: getFutureAnnouncements() }]}
          keyExtractor={(item, index) => item.announcement.uid + index.toString()}
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
        />
      </View>
    </View>
  )
}

export default AnnouncementScreen
