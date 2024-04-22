import { useState } from 'react' 
import { View } from 'react-native' 
import { styles } from './styles' 
import { useSafeAreaInsets } from "react-native-safe-area-context"
import SectionTabs from '../../components/SectionTabs/SectionTabs'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import ContactList from './ContactList/ContactList'
import ContactGraph from './ContactGraph/ContactGraph'

interface ContactListScreenProps{
  navigation: NavigationProp<ParamListBase>
}

const ExploreScreen = ({navigation} : ContactListScreenProps ) => {
  const [selectedTab, setSelectedTab] = useState("Plain View")
  const insets = useSafeAreaInsets()

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      
      <SectionTabs 
        tabs={["Plain View", "Graph View"]}
        startingTab="Plain View"
        onTabChange={tab => {setSelectedTab(tab)}}
      />

      <View style={styles.separationBar} />

      {selectedTab === "Plain View" && 
        <ContactList 
          onContactPress={uid => navigation.navigate("ExternalProfile", {uid: uid})}
        />
      }

      {selectedTab === "Graph View" && 
        <ContactGraph />
      }
      
    </View>
  )
}

export default ExploreScreen