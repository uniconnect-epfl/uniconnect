import React, { useEffect, useState } from "react"
import {
  View,
  Text,
  SectionList,
  SectionListRenderItemInfo,
  TouchableOpacity,
  Pressable,
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
import { globalStyles } from "../../../assets/global/globalStyles"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"

interface AnnouncementsScreenProps {
  onAnnouncementPress: (announcement: Announcement) => void
}

interface RecommendedAnnouncement {
  announcement: Announcement
  recommended: boolean
}

const AnnouncementScreen = ({
  onAnnouncementPress,
}: AnnouncementsScreenProps) => {
  const user_id = getAuth().currentUser?.uid || ""

  const [searchQuery, setSearchQuery] = useState("")
  const navigation = useNavigation()
  const [isLoading, setIsLoading] = useState(true)
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [filteredAnnouncements, setFilteredAnnouncements] = useState<
    RecommendedAnnouncement[]
  >([])

  const [userData, setUserData] = useState<User | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all announcements from the database
        const fetchedAnnouncements = (await getAllAnnouncements()) || [] // Fallback to an empty array if null
        setAnnouncements(fetchedAnnouncements)
        setFilteredAnnouncements(recommendAnnouncements(fetchedAnnouncements))
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
        // Fetch user data from the database
        const user_data = await getUserData(user_id) // Fallback to an empty object if null
        setUserData(user_data)
        setFilteredAnnouncements(recommendAnnouncements(announcements))
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
      const recommendedAnnouncements =
        recommendAnnouncements(searchedAnnouncement)
      setFilteredAnnouncements(recommendedAnnouncements)
    } else {
      console.log(userData?.selectedInterests)

      setFilteredAnnouncements(recommendAnnouncements(announcements))
    }
  }, [searchQuery, announcements, userData])

  function recommendAnnouncements(
    announcements: Announcement[]
  ): RecommendedAnnouncement[] {
    if (!userData || !userData.selectedInterests) {
      return announcements.map((announcement) => ({
        announcement,
        recommended: false,
      }))
    }

    const recomm =  announcements
      .map((announcement) => ({
        announcement,
        recommended:
          announcement.interests.filter((interest) =>
            userData.selectedInterests.includes(interest)
          ).length == Math.min(3, userData.selectedInterests.length),
      }))
      .sort((a, b) => {
        if (b.recommended && !a.recommended) return 1
        if (a.recommended && !b.recommended) return -1
        return 0
      })
      console.log(recomm)
      return recomm
  }

  const sections = [
    { title: "Future Announcements", data: filteredAnnouncements },
  ]

  const handleSearch = (search: string) => {
    setSearchQuery(search)
  }

  const renderItem = ({
    item,
  }: SectionListRenderItemInfo<RecommendedAnnouncement>) => (
    <TouchableOpacity
      onPress={() => {
        onAnnouncementPress(item.announcement)
      }}
    >
      <AnnouncementCard
        announcement={item.announcement}
        recommended={item.recommended}
      />
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
        <Pressable onPress={() => navigation.navigate("EventCreation" as never, {isAnnouncement: true})} style={styles.createEventWrapper} >
          <Text style={[globalStyles.smallText, styles.createEvent]}>Create an announcement</Text>
          <Ionicons name="create-outline" size={16} />
        </Pressable>
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
