import { View } from "react-native"
import { styles } from "./styles"
import React, { useState } from "react"
import SectionTabs from "../../components/SectionTabs/SectionTabs"
import EventScreen from "./EventScreen/EventScreen"
import AnnouncementScreen from "./AnnouncementScreen/AnnouncementScreen"
import { NavigationProp, ParamListBase } from "@react-navigation/native"

interface ExploreScreenProps {
  navigation: NavigationProp<ParamListBase>
}

const ExploreScreen = ({ navigation }: ExploreScreenProps) => {
  const [selectedTab, setSelectedTab] = useState("Events")

  return (
    <View style={styles.container}>
      <SectionTabs
        tabs={["Events", "Announcements"]}
        startingTab="Events"
        onTabChange={(tab) => {
          setSelectedTab(tab)
        }}
      />

      {selectedTab === "Events" && (
        <EventScreen
          onEventPress={(event) =>
            navigation.navigate("ViewEvent", { eventUid: event.uid })
          }
        />
      )}

      {selectedTab === "Announcements" && (
        <AnnouncementScreen
          onAnnouncementPress={(announcement) =>
            navigation.navigate("ViewAnnouncement", {
              announcement: announcement,
            })
          }
        />
      )}
    </View>
  )
}
export default ExploreScreen
