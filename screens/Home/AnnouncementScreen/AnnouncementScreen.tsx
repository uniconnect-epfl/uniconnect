import React, { useEffect, useState } from 'react'
import { View, Text, SectionList, SectionListRenderItemInfo } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'


import { styles } from './../stylesScreen'// Ensure the paths are correct

import { defautlBackgroundColor } from '../../../assets/colors/colors'
import AnnouncementCard from '../../../components/AnnoucementCard/AnnouncementCard'
import { Announcement } from '../../../types/Annoucement'
import { getAllAnnouncements } from '../../../firebase/ManageAnnouncements'
import { showErrorToast } from '../../../components/ToastMessage/toast'
import LoadingScreen from '../../Loading/LoadingScreen'

const AnnouncementScreen = () => {

  //const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [announcements, setAnnouncements] = useState<Announcement[] | null>(null)


  useEffect(() => {
    const fetchData = async () => {
      try {
        const announcements = await getAllAnnouncements() || [] // Fallback to an empty array if null
        console.log(announcements)
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

  const renderSectionHeader = (info: { section: typeof sections[number] }) => (
    // Render the section header
    <View style={{ backgroundColor: defautlBackgroundColor }} >
      <Text style={styles.header}>{info.section.title}</Text>
      <View style={styles.separationBar} />
    </View>
  )

  if (isLoading) {
    // Display a loading indicator while data is fetching
    console.log("Loading...")
    return <LoadingScreen/>
  }

  if (announcements === null) {
    // Display a message if there are no announcements
    console.log("No future announcements available.")
    return <Text>No future announcements available.</Text>
  }

  return (
    console.log("Rendering..."),
    <View style={styles.view}>
      <View style={styles.searchAndMap}>
        {/* <TextInput
          style={styles.input}
          placeholder="Search..."
          onChangeText={handleSearch}
        /> */}
      </View>

      <View style={styles.containerEvent}>
        <SectionList
          sections={sections}
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
        />
      </View>
    </View>
  )
}

export default AnnouncementScreen
