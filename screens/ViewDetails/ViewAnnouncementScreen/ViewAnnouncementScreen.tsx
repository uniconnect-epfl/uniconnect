import React, { View, Text, TouchableOpacity } from "react-native"
import { RouteProp, useRoute } from "@react-navigation/native"
import { Announcement } from "../../../types/Annoucement"
import { styles } from "./styles"
import { viewDetailsStyles } from "../ViewDetailsStyles"
import { globalStyles } from "../../../assets/global/globalStyles"
// import ProfilePicture from "../../../components/ProfilePicture/ProfilePicture"
import { BackArrow } from "../../../components/BackArrow/BackArrow"
import ProfilePicture from "../../../components/ProfilePicture/ProfilePicture"

import { useEffect, useState } from "react"
import { getUserData } from "../../../firebase/User"
import LoadingScreen from "../../Loading/LoadingScreen"
import { User } from "../../../types/User"

type RootStackParamList = {
  ViewAnnouncement: {
    onHostPress: (host: User) => void
    announcement: Announcement
  }
}

type ViewAnnoucementScreenRouteProps = RouteProp<
  RootStackParamList,
  "ViewAnnouncement"
>

const ViewAnnoucementScreen = () => {
  const { onHostPress, announcement } =
    useRoute<ViewAnnoucementScreenRouteProps>().params

  const [loading, setLoading] = useState(true)
  const [host, setHost] = useState<User | null>(null)

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        setLoading(true)
        if (announcement?.host) {
          const fetchedHost = await getUserData(announcement.host)
          setHost(fetchedHost)
        }
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }

    fetchEventData()
  }, [announcement])

  if (loading || !announcement || !host) {
    return <LoadingScreen />
  }

  return (
    <View style={styles.container}>
      <View style={viewDetailsStyles.topBackground} />
      <BackArrow />

      <View style={viewDetailsStyles.detailsContainer}>
        <Text
          style={[
            globalStyles.boldText,
            viewDetailsStyles.title,
            viewDetailsStyles.detailsText,
          ]}
        >
          {announcement.title}
        </Text>
        <Text style={[globalStyles.text, viewDetailsStyles.detailsText]}>
          {announcement.interests.join(" ")}
        </Text>

        <TouchableOpacity
          style={viewDetailsStyles.profileContainer}
          onPress={() => {
            if (host) {
              onHostPress(host)
            }
          }}
        >
          <Text style={globalStyles.smallText}>By </Text>
          <ProfilePicture size={25} pictureUrl={host?.profilePicture || ""} />
          <Text style={globalStyles.smallText}>
            {" "}
            {host?.firstName} {host?.lastName}
          </Text>
        </TouchableOpacity>

        <View style={viewDetailsStyles.separationBar} />

        <Text
          style={[
            globalStyles.smallText,
            viewDetailsStyles.descriptionContainer,
          ]}
        >
          {announcement.description}
        </Text>
      </View>
    </View>
  )
}

export default ViewAnnoucementScreen
