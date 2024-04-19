import { View, Text, TouchableOpacity } from "react-native"
import { styles } from "./styles"
import { globalStyles } from "../../../assets/global/globalStyles"
import GeneralProfile from "../../../components/GeneralProfile/GeneralProfile"
import ExpandableDescription from "../../../components/ExpandableDescription/ExpandableDescription"
import { RouteProp, useRoute } from "@react-navigation/native"

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

type RootStackParamList = {
  ExternalProfile: {
      uid: string;
  };
};

type ExternalProfileScreenRouteProp = RouteProp<RootStackParamList, 'ExternalProfile'>;


const ExternalProfileScreen = (
  //{ route } : {route: RouteProp<{ params: { uid: string } }, 'params'>}
) => {

  const { uid } = useRoute<ExternalProfileScreenRouteProp>().params
  
  return (

    <View style={styles.container}>
      <View style={styles.topBackground} />
      <View style={styles.profileContainer}>

        <View style={styles.topProfileContainer}>

          <GeneralProfile
            name={dummyProfile.firstName}
            surname={dummyProfile.lastName}
            location={dummyProfile.location}
          />
          
          <View style={styles.buttonsContainer}>
            <TouchableOpacity 
              style={styles.button}
              onPress={() => alert("To come")}>
              <Text style={[globalStyles.boldText, styles.buttonText]}>Message</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, styles.invertedButtonColors]}
              onPress={() => alert("To come")}>
              <View style={styles.horizontalContainer}>
                <Text style={[globalStyles.boldText, styles.buttonText]}>Remove</Text>
              </View>
            </TouchableOpacity>
          </View>

        </View>

        <ExpandableDescription
          description={uid}
        />

        <View style={styles.separatorLine} />

        </View>

      </View>

  )
}

export default ExternalProfileScreen