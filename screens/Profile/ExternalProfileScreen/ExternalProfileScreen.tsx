import { View, Text, TouchableOpacity } from "react-native"
import { styles } from "./styles"
import { globalStyles } from "../../../assets/global/globalStyles"
import GeneralProfile from "../../../components/GeneralProfile/GeneralProfile"
import ExpandableDescription from "../../../components/ExpandableDescription/ExpandableDescription"
import SectionTabs from "../../../components/SectionTabs/SectionTabs"
import { useState } from "react"
import { profileStyles } from "../profileStyles"
import { ProfileEvents } from "../ProfileEvents/ProfileEvents"
import { ProfileInterests } from "../ProfileInterests/ProfileInterests"
import { ProfileNetwork } from "../ProfileNetwork/ProfileNetwork"

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
  lastName: "DelaStrite",
  profilePictureUrl: "",
  description: "Description, description, descrc hdsjklaf hel fhj fdj bjhd vbfdhj vbdjhl vdjlh vdhj vfdjh hvdu vdh vdfj vdfs hfdj fdj vdfjl d grei hrj heiua fjispd jis gjdrkl gjreks reksl grei gril nrsj njiption, loooooooooong descriiiiiiiiiiption, this is a veeeeeeeeeeeeeeeeeeeeeery loooooooooooooooooooooooooooooooooooooooooooong descriiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiption alala",
  interests: ["running"],
  qualifications: ["bowling"],
  location: "EPFL Ecublens"
}

/*
* These lines are commented to not have an error with eslint, uncomment them to get the uid of the profile screen
*/
/*
type RootStackParamList = {
  ExternalProfile: {
      uid: string;
  };
};

type ExternalProfileScreenRouteProp = RouteProp<RootStackParamList, 'ExternalProfile'>;
*/

const ExternalProfileScreen = () => {

  //const { uid } = useRoute<ExternalProfileScreenRouteProp>().params
  const [selectedTab, setSelectedTab] = useState("Network")
  
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

        </View>

        <ExpandableDescription description={dummyProfile.description} />

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