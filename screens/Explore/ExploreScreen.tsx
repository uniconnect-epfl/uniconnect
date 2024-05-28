import { View } from "react-native"
import { styles } from "./styles"
import React, { SetStateAction, useState } from "react"
import SectionTabs from "../../components/SectionTabs/SectionTabs"
import EventScreen from "./EventScreen/EventScreen"
import AnnouncementScreen from "./AnnouncementScreen/AnnouncementScreen"
import { NavigationProp, ParamListBase } from "@react-navigation/native"
import { User } from "../../types/User"

interface ExploreScreenProps {
  navigation: NavigationProp<ParamListBase>
}

const ExploreScreen = ({ navigation }: ExploreScreenProps) => {
  const [selectedTab, setSelectedTab] = useState("Events")

  const onHostPress = (host: User) => {
    navigation.navigate("ExternalProfile", { externalUserUid: host.uid })
  }

  return (
    <View style={styles.container}>
      <SectionTabs
        tabs={["Events", "Announcements"]}
        startingTab="Events"
        onTabChange={(tab: SetStateAction<string>) => {
          setSelectedTab(tab)
        }}
      />

      {selectedTab === "Events" && (
        <EventScreen
          onEventPress={(event) =>
            navigation.navigate("ViewEvent", {
              onHostPress: onHostPress,
              eventUid: event.uid,
            })
          }
        />
      )}

      {selectedTab === "Announcements" && (
        <AnnouncementScreen
          onAnnouncementPress={(announcement) =>
            navigation.navigate("ViewAnnouncement", {
              onHostPress: onHostPress,
              announcement: announcement,
            })
          }
        />
      )}
    </View>
  )
}
export default ExploreScreen
