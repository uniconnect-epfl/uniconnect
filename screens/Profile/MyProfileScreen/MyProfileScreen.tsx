import React, { useEffect, useState } from "react"
import { Text, View, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import ExpandableDescription from "../../../components/ExpandableDescription/ExpandableDescription"
import GeneralProfile from "../../../components/GeneralProfile/GeneralProfile"
import { black } from "../../../assets/colors/colors"
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

interface MyProfileScreenProps{
  navigation: NavigationProp<ParamListBase>
}

export const MyProfileScreen = ({ navigation }: MyProfileScreenProps) => {
  const [selectedTab, setSelectedTab] = useState("Events")
  const userId = getAuth().currentUser?.uid
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      if(userId){
        setUser(await getUserData(userId))
      }
      setLoading(false)
    }
    fetchData()
  }, [userId])

  if(loading || !user){
    return <LoadingScreen/>
  }
  return (
    <View style={styles.container}>
      <View style={profileStyles.topBackground} />
      <View style={profileStyles.profileContainer}>
        <View style={profileStyles.topProfileContainer}>
          <GeneralProfile
            name={user.firstName}
            surname={user.lastName}
            location={user.location}
          />

          <View style={profileStyles.buttonsContainer}>
            <TouchableOpacity
              style={profileStyles.button}
              onPress={() => navigation.navigate("UpdateProfile")}
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


        <ExpandableDescription
          description={user.description}
        />

        <SectionTabs
          tabs={["Events", "Interests"]}
          startingTab="Events"
          onTabChange={setSelectedTab}
        />

        <View style={styles.separatorLine} />

        {selectedTab === "Events" && <ProfileEvents />}
        {selectedTab === "Interests" && <ProfileInterests />}
      </View>
    </View>
  )
}
