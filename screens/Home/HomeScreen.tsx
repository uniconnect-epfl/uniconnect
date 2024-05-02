
import { View } from "react-native"
import { styles } from "./styles"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { useNavigation } from "@react-navigation/native"
import React, { useState } from "react"
// will need to import it from the database later

import SectionTabs from "../../components/SectionTabs/SectionTabs"
import EventScreen from "./EventScreen/EventScreen"
import AnnouncementScreen from "./AnnouncementScreen/AnnouncementScreen"

const retrieveAnnoucements = 
  /*async () => {
  try {
    const response = await fetch("https://api.example.com/events")
    const events = await response.json()
    return events
  } catch (error) {
    console.error("Error retrieving events:", error)
  }*/
  [
    { 
      uid: "1",
      title: "Balelek 2023",
      location: "EPFL, Agora",
      latitude: 46.51858962578904,
      longitude: 6.566048509782951,
      description: "Music festival 2023",
      date: "2023-04-04", // changed to YYYY-MM-DD format
      imageUrl: "https://balelec.ch/uploads/2023_f4caf642b6.jpg",
    },
    {
      uid: "2",
      title: "Event 2",
      location: "EPFL, CM",
      latitude: 46.51859297638995, 
      longitude: 6.563141941352757,
      description: "Agepoly",
      date: "2022-08-04", // changed to YYYY-MM-DD format
      imageUrl: "https://example.com/image.png",
    },
    {
      uid: "3",
      title: "Balelek 2024",
      location: "EPFL, Agora",
      latitude: 46.51992048733761,
      longitude: 6.565926796074852,
      description: "Music festival 2024",
      date: "2024-05-20", // changed to YYYY-MM-DD format
      imageUrl: "https://example.com/image.png",
    },
    { 
      uid: "4",
      title: "Graduation 2025",
      location: "EPFL, Swisstech",
      latitude: 46.52277976263842,
      longitude: 6.565209257647138,
      description: "Graduation",
      date: "2025-06-04", // changed to YYYY-MM-DD format
      imageUrl: "https://example.com/image.png",
    },
]

const HomeScreen = () => {
  const insets = useSafeAreaInsets()
  const [selectedTab, setSelectedTab] = useState("Events")
  const navigation = useNavigation()




  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <SectionTabs
        tabs={["Events","Announcements"]}
        startingTab="Events"
        onTabChange={(tab) => {
          setSelectedTab(tab)
        }}
      />

      <View style={styles.separationBar} />

      {selectedTab === "Events" && (
        <EventScreen
          onEventPress={(uid) =>
            navigation.navigate("EventScreen", { uid: uid })
          }
          events={retrieveEvents}
        />
      )}

      {selectedTab === "Announcements" && (
        <AnnouncementScreen
          onEventPress={(uid) =>
            navigation.navigate("AnnouncementScreen", { uid: uid })
          }
          events={retrieveAnnoucements}
        />
      )}
    </View>
  )

}
export default HomeScreen