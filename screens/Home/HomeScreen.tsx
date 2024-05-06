
import { View } from "react-native"
import { styles } from "./styles"
import React, { useState } from "react"
import SectionTabs from "../../components/SectionTabs/SectionTabs"
import EventScreen from "./EventScreen/EventScreen"
import AnnouncementScreen from "./AnnouncementScreen/AnnouncementScreen"


const HomeScreen = () => {
  const [selectedTab, setSelectedTab] = useState("Events")

  return (
    <View style={styles.container}>
      <SectionTabs
        tabs={["Events","Announcements"]}
        startingTab="Events"
        onTabChange={(tab) => {
          setSelectedTab(tab)
        }}
      />

      {selectedTab === "Events" && (
        <EventScreen
        />
      )}

      {selectedTab === "Announcements" && (
        <AnnouncementScreen
        />
      )}
    </View>
  )

}
export default HomeScreen