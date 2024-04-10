import { useState } from 'react';
import { View, Text, FlatList, Image, TextInput, TouchableOpacity} from 'react-native';
import { styles } from './styles';
import { Ionicons } from '@expo/vector-icons'

export type Contact = {
  uid: string,
  firstName: string,
  lastName: string,
  profilePictureUrl?: string,
  description: string,
  interests: string[],
  qualifications: string[]
}

// to inject the contacts data
export type ContactListScreenProps = {
  initialContacts?: Contact[];
};

export const ContactListScreen = ({ initialContacts = [] }: ContactListScreenProps ) => {
  const [filteredContacts, setFilteredContacts] = useState(initialContacts);
  const [searchText, setSearchText] = useState('');
  const [selectedTab, setSelectedTab] = useState('Plain View');
 
  const handleSearch = (text: string) => {
    setSearchText(text);
    if(text){
        const filtered = initialContacts.filter((contact) =>
          `${contact.firstName} ${contact.lastName}`.toLowerCase().includes(text.toLowerCase())
        )
        setFilteredContacts(filtered);
    }else{
        setFilteredContacts(initialContacts);
    }
  }

  const RenderOneContact = ({ item } : { item : Contact }) => (
    <View style={styles.cardContainer}>
      {item.profilePictureUrl? (
        <Image
          style={styles.profilePicture}
          source={{uri: item.profilePictureUrl}}
        />
      ) : (
        <View style={styles.profilePicture}>
          <Ionicons name="person" size={50} color="black" />
        </View>
      )}
      <View style={styles.container}>
        <Text 
          style={styles.contactDescription}
          numberOfLines={3}>
            {item.description}
        </Text>
        <View style={styles.container}>
          <Text style={styles.contactName}>{item.firstName}</Text>
          <Text style={styles.contactFriendType}>friend</Text>
        </View>
      </View>
    </View>
  )

  return (
    <View style={styles.container}>
      
      <View style={styles.horizonatlBarContainer}>
        <Text>Here will be the top navigation bar</Text>
      </View>
      
      <View style={styles.viewChoiceContainer}>
        <TouchableOpacity style={styles.contactList} onPress={() => setSelectedTab('Plain View')}>
          <Text style={[styles.greyLightText, selectedTab === 'Plain View' && styles.darkBoldText]}>
            Plain View
          </Text>
          <View style={[styles.viewCHoiceUnderLine, selectedTab === 'Graph View' && styles.invisibleBackground]}/>
        </TouchableOpacity>

        <TouchableOpacity style={styles.contactList} onPress={() => setSelectedTab('Graph View')}>
          <Text style={[styles.greyLightText, selectedTab === 'Graph View' && styles.darkBoldText]}>
            Graph View
          </Text>
          <View style={[styles.viewCHoiceUnderLine, selectedTab === 'Plain View' && styles.invisibleBackground]}/>
        </TouchableOpacity>
      </View>

      <View>
        <TextInput 
          style = {styles.searchBar}
          placeholder="Search..." 
          value={searchText}
          onChangeText={handleSearch}
        />
      </View>
      
      <View style={styles.container}>
        <FlatList
          data={filteredContacts}
          renderItem={RenderOneContact}
          keyExtractor={(contact) => contact.uid}
        />
      </View>

      <View style={styles.horizonatlBarContainer}>
        <Text>Here will be the bottom navigation bar</Text>
      </View>

    </View>
  )

}


