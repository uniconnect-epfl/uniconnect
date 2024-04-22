import { Text, View, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import ExpandableDescription from "../../../components/ExpandableDescription/ExpandableDescription"
import GeneralProfile from "../../../components/GeneralProfile/GeneralProfile"
import { black } from "../../../assets/colors/colors"
import InputField from "../../../components/InputField/InputField"
import { useState } from "react"
import { useNavigation } from "@react-navigation/native"
import { profileStyles } from "../profileStyles"
import { styles } from "./styles"
import { globalStyles } from "../../../assets/global/globalStyles"

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

export const MyProfileScreen = () => {
  const [search, setSearch] = useState("")
  const useNav = useNavigation()

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
              onPress={() => useNav.navigate("UpdateProfile" as never)}>
              <Text style={[globalStyles.boldText, profileStyles.buttonText]}>Update</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={profileStyles.button}
              onPress={() => useNav.navigate("MyQR" as never)}>
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

        <View style={styles.separatorLine} />

        <View style={profileStyles.horizontalContainer}>
          <InputField
            label=""
            placeholder="Search..."
            value={search}
            onChangeText={text => setSearch(text)}>
          </InputField>
        </View>
      
        <View style={styles.container}>

        </View>

      </View>
    </View>
  )
}