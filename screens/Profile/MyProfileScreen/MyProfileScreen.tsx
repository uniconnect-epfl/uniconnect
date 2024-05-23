import React, { useCallback, useEffect, useState } from "react"
import { Text, View, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import ExpandableDescription from "../../../components/ExpandableDescription/ExpandableDescription"
import GeneralProfile from "../../../components/GeneralProfile/GeneralProfile"
import { black, peach } from "../../../assets/colors/colors"
import { NavigationProp, ParamListBase } from "@react-navigation/native"
import { profileStyles } from "../profileStyles"
import { styles } from "./styles"
import { globalStyles } from "../../../assets/global/globalStyles"
import SectionTabs from "../../../components/SectionTabs/SectionTabs"
import { ProfileEvents } from "../ProfileEvents/ProfileEvents"
import { ProfileInterests } from "../ProfileInterests/ProfileInterests"
import { getAuth } from "firebase/auth"
import { User } from "../../../types/User"
import { getUserData } from "../../../firebase/User"
import LoadingScreen from "../../Loading/LoadingScreen"
import { useSafeAreaInsets } from "react-native-safe-area-context"

interface MyProfileScreenProps {
  navigation: NavigationProp<ParamListBase>
}

export const MyProfileScreen = ({ navigation }: MyProfileScreenProps) => {
  const [selectedTab, setSelectedTab] = useState("Events")
  const userId = getAuth().currentUser?.uid
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const insets = useSafeAreaInsets()

  const fetchData = useCallback(async () => {
    setLoading(true)
    if (userId) {
      setUser(await getUserData(userId))
    }
    setLoading(false)
  }, [userId])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  if (loading || !user) {
    return <LoadingScreen />
  }
  return (
    <View style={styles.container}>
      <View style={[profileStyles.profileContainer, {paddingTop: insets.top + 5}]}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} testID="back-button">
            <Ionicons name="arrow-back-outline" size={24} color={peach} />
          </TouchableOpacity>
        </View>
        <View style={profileStyles.topProfileContainer}>
          <GeneralProfile
            name={user.firstName}
            surname={user.lastName}
            location={user.location}
            profilePicture={user.profilePicture}
          />

          <View style={profileStyles.buttonsContainer}>
            <TouchableOpacity
              style={profileStyles.button}
              onPress={() => navigation.navigate("UpdateProfile", { user: user, fetchData: fetchData } )}
            >
              <Text style={[globalStyles.boldText, profileStyles.buttonText]}>
                Update
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={profileStyles.button}
              onPress={() => navigation.navigate("MyQR")}
            >
              <View style={profileStyles.horizontalContainer}>
                <Ionicons name="qr-code" size={14} color={black} />
                <Text style={[globalStyles.boldText, profileStyles.buttonText]}>
                  QR
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <ExpandableDescription description={user.description} />

        <SectionTabs
          tabs={["Events", "Interests"]}
          startingTab="Events"
          onTabChange={setSelectedTab}
        />

        {selectedTab === "Events" && <ProfileEvents />}
        {selectedTab === "Interests" && <ProfileInterests user={user} />}
      </View>
    </View>
  )
}
