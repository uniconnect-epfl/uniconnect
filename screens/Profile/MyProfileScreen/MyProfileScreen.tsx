import React, { useState } from "react"
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
import { mockContacts } from "../../Contacts/mockContacts"

interface MyProfileScreenProps {
  navigation: NavigationProp<ParamListBase>
}

export const MyProfileScreen = ({ navigation }: MyProfileScreenProps) => {
  const [selectedTab, setSelectedTab] = useState("Events")

  return (
    <View style={styles.container}>
      <View style={profileStyles.topBackground} />
      <View style={profileStyles.profileContainer}>
        <View style={profileStyles.topProfileContainer}>
          <GeneralProfile
            name={mockContacts[0].firstName}
            surname={mockContacts[0].lastName}
            location={mockContacts[0].location}
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

        <ExpandableDescription description={mockContacts[0].description} />

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
