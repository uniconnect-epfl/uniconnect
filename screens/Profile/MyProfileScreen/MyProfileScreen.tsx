import React from "react"
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
import { useState } from "react"
import { ProfileEvents } from "../ProfileEvents/ProfileEvents"
import { ProfileInterests } from "../ProfileInterests/ProfileInterests"

type Contact = {
  uid: string
  firstName: string
  lastName: string
  profilePictureUrl?: string
  description: string
  interests: string[]
  qualifications: string[],
  location: string
}

const dummyProfile: Contact = {
  uid: "4",
  firstName: "Hervé",
  lastName: "DelaMontagne",
  profilePictureUrl: "",
  description: "Description, description, descrc hdsjklaf hel fhj fdj bjhd vbfdhj vbdjhl vdjlh vdhj vfdjh hvdu vdh vdfj vdfs hfdj fdj vdfjl d grei hrj heiua fjispd jis gjdrkl gjreks reksl grei gril nrsj njiption, loooooooooong descriiiiiiiiiiption, this is a veeeeeeeeeeeeeeeeeeeeeery loooooooooooooooooooooooooooooooooooooooooooong descriiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiption alala",
  interests: ["running"],
  qualifications: ["bowling"],
  location: "EPFL Ecublens"
}

interface MyProfileScreenProps{
  navigation: NavigationProp<ParamListBase>
}

export const MyProfileScreen = ({navigation} : MyProfileScreenProps) => {
  const [selectedTab, setSelectedTab] = useState("Events")

  return (
    <View style={styles.container}>
      <View style={profileStyles.topBackground} />
      <View style={profileStyles.profileContainer}>

        <View style={profileStyles.topProfileContainer}>

          <GeneralProfile
            name={dummyProfile.firstName}
            surname={dummyProfile.lastName}
            location={dummyProfile.location}
          />
          
          <View style={profileStyles.buttonsContainer}>
            <TouchableOpacity 
              style={profileStyles.button}
              onPress={() => navigation.navigate("UpdateProfile")}>
              <Text style={[globalStyles.boldText, profileStyles.buttonText]}>Update</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={profileStyles.button}
              onPress={() => navigation.navigate("MyQR")}>
              <View style={profileStyles.horizontalContainer}>
                <Ionicons name="qr-code" size={14} color={black} />
                <Text style={[globalStyles.boldText, profileStyles.buttonText]}>QR</Text>
              </View>
            </TouchableOpacity>
          </View>

        </View>

        <ExpandableDescription
          description={dummyProfile.description}
        />

        <SectionTabs 
          tabs={["Events", "Interests"]}
          startingTab="Events"
          onTabChange={setSelectedTab}
          />

        <View style={styles.separatorLine} />

        {selectedTab === "Events" && <ProfileEvents/>}
        {selectedTab === "Interests" && <ProfileInterests/>}

      </View>
    </View>
  )
}