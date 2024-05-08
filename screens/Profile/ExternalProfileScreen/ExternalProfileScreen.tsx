import React, { View, Text, TouchableOpacity } from "react-native"
import { styles } from "./styles"
import { globalStyles } from "../../../assets/global/globalStyles"
import GeneralProfile from "../../../components/GeneralProfile/GeneralProfile"
import ExpandableDescription from "../../../components/ExpandableDescription/ExpandableDescription"
import SectionTabs from "../../../components/SectionTabs/SectionTabs"
import { useEffect, useState } from "react"
import { profileStyles } from "../profileStyles"
import { ProfileEvents } from "../ProfileEvents/ProfileEvents"
import { ProfileInterests } from "../ProfileInterests/ProfileInterests"
import { ProfileNetwork } from "../ProfileNetwork/ProfileNetwork"
import { RouteProp, useRoute } from "@react-navigation/native"
import { getAuth } from "firebase/auth"
import LoadingScreen from "../../Loading/LoadingScreen"
import { getUserData } from "../../../firebase/User"
import { User } from "../../../types/User"

type RootStackParamList = {
  ExternalProfile: {
      externalUserUid: string;
  }
}

type ExternalProfileScreenRouteProp = RouteProp<RootStackParamList, "ExternalProfile">

const ExternalProfileScreen = () => {
  const { externalUserUid } = useRoute<ExternalProfileScreenRouteProp>().params
  const [externalUser, setExternalUser] = useState<User | null>(null)
  const [externalUserLoading, setExternalUserLoading] = useState(true)

  const userId = getAuth().currentUser?.uid
  const [user, setUser] = useState<User | null>(null)
  const [userLoading, setUserLoading] = useState(true)

  const [selectedTab, setSelectedTab] = useState("Network")
  const [isFriend, setIsFriend] = useState(false)
  
  useEffect(() => {
    // load the user of the app
    const fetchData = async () => {
      setUserLoading(true)
      if(userId){
        setUser(await getUserData(userId))
      }
      setUserLoading(false)
    }
    fetchData()
  }, [userId])

  useEffect(() => {
    // load the user of which we want to see the profile
    const fetchData = async () => {
      setExternalUserLoading(true)
      if(externalUserUid){
        setExternalUser(await getUserData(externalUserUid))
      }
      setExternalUserLoading(false)
    }
    fetchData()
  }, [externalUserUid])

  useEffect(() => {
    if(user && externalUser){
      // this will just check if the two are friends when we'll have implemented friends
      setIsFriend(true)
    } else {
      setIsFriend(false)
    }
  }, [user, externalUser])

  if(userLoading || !user || externalUserLoading || !externalUser){
    return <LoadingScreen/>
  }

  return (

    <View style={styles.container}>
      <View style={profileStyles.topBackground} />
      <View style={profileStyles.profileContainer}>

        <View style={profileStyles.topProfileContainer}>

          <GeneralProfile
            name={externalUser.firstName}
            surname={externalUser.lastName}
            location={externalUser.location}
          />
          
          {isFriend ? (
            <View style={profileStyles.buttonsContainer}>
              <TouchableOpacity 
                style={profileStyles.button}
                onPress={() => alert("To come")}>
                <Text style={[globalStyles.boldText, profileStyles.buttonText]}>Message</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[profileStyles.button, styles.invertedButtonColors]}
                onPress={() => alert("To come")}>
                <View style={profileStyles.horizontalContainer}>
                  <Text style={[globalStyles.boldText, profileStyles.buttonText]}>Remove</Text>
                </View>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={profileStyles.buttonsContainer}>
              <TouchableOpacity 
                style={[profileStyles.button, styles.uniqueButton]}
                onPress={() => alert("To come")}>
                <View style={profileStyles.horizontalContainer}>
                  <Text style={[globalStyles.boldText, profileStyles.buttonText]}>Add</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}

        </View>

        <ExpandableDescription description={externalUser.description} />

        <SectionTabs 
          tabs={["Events", "Interests", "Network"]}
          startingTab={selectedTab}
          onTabChange={tab => {setSelectedTab(tab)}}
        />

        <View style={styles.separatorLine} />

        { selectedTab === "Events" && <ProfileEvents /> }
        { selectedTab === "Interests" && <ProfileInterests /> }
        { selectedTab === "Network" && <ProfileNetwork /> }

      </View>
    </View>

  )
}

export default ExternalProfileScreen