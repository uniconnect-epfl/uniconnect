
import { View } from "react-native"
import { styles } from "./styles"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import React, { useState } from "react"
// will need to import it from the database later

import SectionTabs from "../../components/SectionTabs/SectionTabs"
import EventScreen from "./EventScreen/EventScreen"
import AnnouncementScreen from "./AnnouncementScreen/AnnouncementScreen"


const HomeScreen = () => {
  const insets = useSafeAreaInsets()
  const [selectedTab, setSelectedTab] = useState("Events")
  //const navigation = useNavigation()




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