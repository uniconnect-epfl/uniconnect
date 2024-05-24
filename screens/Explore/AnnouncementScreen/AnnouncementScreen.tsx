import React, { useEffect, useState } from "react"
import {
  View,
  Text,
  SectionList,
  SectionListRenderItemInfo,
  TouchableOpacity,
  TextInput,
} from "react-native"
import { styles } from "./styles" // Ensure the paths are correct
import AnnouncementCard from "../../../components/AnnoucementCard/AnnouncementCard"
import { Announcement } from "../../../types/Annoucement"
import { getAllAnnouncements } from "../../../firebase/ManageAnnouncements"
import { showErrorToast } from "../../../components/ToastMessage/toast"
import LoadingScreen from "../../Loading/LoadingScreen"
import { getAuth } from "firebase/auth"
import { User } from "../../../types/User"
import { getUserData } from "../../../firebase/User"

interface AnnouncementsScreenProps {
  onAnnouncementPress: (announcement: Announcement) => void
}

const AnnouncementScreen = ({
  onAnnouncementPress,
}: AnnouncementsScreenProps) => {
  const user_id = getAuth().currentUser?.uid || ""

  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [filteredAnnouncements, setFilteredAnnouncements] = useState<
    Announcement[]
  >([])

  const [userData, setUserData] = useState<User | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        //Fetch all announcements from the database
        const fetchedAnnouncements = (await getAllAnnouncements()) || [] // Fallback to an empty array if null
        setAnnouncements(fetchedAnnouncements)
        setFilteredAnnouncements(fetchedAnnouncements)
        setIsLoading(false)
      } catch (error) {
        showErrorToast(
          "Error fetching announcements. Please check your connection and try again."
        )
        setIsLoading(false) // Set loading to false regardless of result
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        //Fetch user data from the database
        const user_data = await getUserData(user_id) // Fallback to an empty object if null
        setUserData(user_data)
        setIsLoading(false)
      } catch (error) {
        showErrorToast(
          "Error fetching User Data. Please check your connection and try again."
        )
        setIsLoading(false) // Set loading to false regardless of result
      }
    }
    if (user_id) {
      fetchUserData()
    }
  }, [])

  useEffect(() => {
    if (searchQuery) {
      const searchedAnnouncement = announcements.filter(
        (announcement: { title: string }) =>
          announcement.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
      console.log(searchedAnnouncement)

      const recommandedAnnouncement =
        recommandAnnouncement(searchedAnnouncement)
      setFilteredAnnouncements(recommandedAnnouncement)

      console.log(announcements)
    } else {
      setFilteredAnnouncements(recommandAnnouncement(announcements))
    }
  }, [searchQuery, announcements, userData])

  function recommandAnnouncement(
    announcements: Announcement[]
  ): Announcement[] {
    if (!userData || !userData.selectedInterests) return announcements

    return announcements
      .map((announcement) => ({
        ...announcement,
        commonInterests: announcement.interests.filter((interest) =>
          userData.selectedInterests.includes(interest)
        ).length,
      }))
      .sort((a, b) => b.commonInterests - a.commonInterests)
  }

  const sections = [
    { title: "Future Announcements", data: filteredAnnouncements },
  ]

  const handleSearch = (search: string) => {
    setSearchQuery(search)
  }

  const renderItem = ({ item }: SectionListRenderItemInfo<Announcement>) => (
    <TouchableOpacity
      onPress={() => {
        onAnnouncementPress(item)
      }}
    >
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
