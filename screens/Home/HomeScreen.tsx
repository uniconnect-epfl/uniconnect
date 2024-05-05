
import { View } from "react-native"
import { styles } from "./styles"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import React, { useState } from "react"
// will need to import it from the database later

import SectionTabs from "../../components/SectionTabs/SectionTabs"
import EventScreen from "./EventScreen/EventScreen"
import AnnouncementScreen from "./AnnouncementScreen/AnnouncementScreen"
import { NavigationProp, ParamListBase } from "@react-navigation/native"

interface HomeScreenProps {
  navigation: NavigationProp<ParamListBase>
}

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const insets = useSafeAreaInsets()
  const [selectedTab, setSelectedTab] = useState("Events")

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
          onEventPress={(event) => navigation.navigate("ViewEvent", {uid: event.uid})}
        />
      )}

      {selectedTab === "Announcements" && (
        <AnnouncementScreen
          onAnnoucmentPress={(announcement) => navigation.navigate("ViewAnnouncement", {announcement: announcement})}
        />
      )}
    </View>
  )

}
export default HomeScreen