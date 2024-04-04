import { useState } from 'react';

import { View, Text, FlatList, Image, TextInput, TouchableOpacity} from 'react-native';
import { styles } from './styles';
import { Ionicons } from '@expo/vector-icons'

type Contact = {
  uid: string,
  firstName: string,
  lastName: string,
  description: string,
  interests: string[],
  qualifications: string[]
}

const dummyData: Contact[] = [
  {uid: '1', firstName: 'Jocović', lastName: 'Dellpouelo', description: 'This guy is very weird', interests: ['surfing', 'machine learning'], qualifications: []},
  {uid: '2', firstName: 'Stephano', lastName: 'Carasto', description: 'No description', interests: [], qualifications: ['surfing', 'machine learning']},
  {uid: '3', firstName: 'Henrique', lastName: 'Nique', description: 'Good question', interests: ['surfing'], qualifications: ['machine learning']},
  {uid: '4', firstName: 'Hervé', lastName: 'Delamontagne', description: 'Description, description, description, loooooooooong descriiiiiiiiiiption, this is a veeeeeeeeeeeeeeeeeeeeeery loooooooooooooooooooooooooooooooooooooooooooong descriiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiption alala', interests: ['running'], qualifications: ['bowling']},
  {uid: '5', firstName: 'Charles', lastName: 'Dupond', description: 'Aaaaaaaaaaaaaaaaaaaa', interests: ['machine learning'], qualifications: ['running', 'bowling']},
  {uid: '6', firstName: 'Charlotte', lastName: 'Motte', description: 'Bbbbbbbbbbbbbbbbbb', interests: ['walking'], qualifications: ['running']},
  {uid: '7', firstName: 'Charlović', lastName: 'Poutine', description: 'Description 7', interests: [], qualifications: ['python', 'java', 'C++']},
  {uid: '8', firstName: 'Stephanović', lastName: 'Vladimir', description: 'I love fish', interests: ['surfing', 'machine learning'], qualifications: ['biology']},
  {uid: '9', firstName: 'Lulu', lastName: 'Nom', description: 'I love bamboo', interests: ['surfing', 'machine learning'], qualifications: ['litterature']},
  {uid: '10', firstName: 'Lili', lastName: 'De', description: '19 + 4 = 22', interests: ['surfing', 'machine learning'], qualifications: ['a', 'b', 'c', 'd', 'e', 'f', 'h']},
  {uid: '11', firstName: 'Lala', lastName: 'Famille', description: 'I\'m doing university for fun', interests: ['a', 'b', 'c', 'd', 'e', 'f', 'h'], qualifications: ['a', 'b', 'c', 'd', 'e', 'f', 'h']},
  {uid: '12', firstName: 'Abc', lastName: 'Onu', description: 'Didn\'t want a description', interests: [], qualifications: ['a', 'b', 'c', 'd', 'e', 'f', 'h']},
  {uid: '13', firstName: 'Def', lastName: 'Steph', description: '-', interests: ['movies'], qualifications: ['history']},
  {uid: '14', firstName: 'Hij', lastName: 'Non', description: 'Mataphisical question', interests: [], qualifications: []},
]

export const ContactListScreen = () => {
  const [filteredContacts, setFilteredContacts] = useState(dummyData);
  const [searchText, setSearchText] = useState('');
  const [selectedTab, setSelectedTab] = useState('Plain View');

  const handleSearch = (text: string) => {
    setSearchText(text);
    if(text){
        const filtered = dummyData.filter((contact) =>
          `${contact.firstName} ${contact.lastName}`.toLowerCase().includes(text.toLowerCase())
        )
        setFilteredContacts(filtered);
    }else{
        setFilteredContacts(dummyData);
    }
  }

  const TopScreen = () => { // will be a module
    return (
      <View style={styles.horizontalContainer}>
        <Ionicons name="person" size={24} color="black"/>
        <Ionicons name="settings" size={24} color="black"/>
        <Ionicons name="settings" size={24} color="black"/>
      </View>
    )
  }

  const RenderOneContact = ({ item } : { item : Contact }) => (
    <View style={styles.cardContainer}>
      <Image
        source={require("../../assets/icon.png")} // Replace with your image path
        style={styles.profilePicture}
      />
      <View style={styles.textContainer}>
        <Text style={styles.description}>{item.description}</Text>
        <View style={styles.textContainer}>
          <Text style={styles.name}>{item.firstName}</Text>
          <Text style={styles.friendType}>friend</Text>
        </View>
      </View>
    </View>
  )

  return (
    <View style={styles.container}>
      <TopScreen/>
      
        <View style={styles.viewChoiceContainer}>
          <TouchableOpacity style={styles.list} onPress={() => setSelectedTab('Plain View')}>
            <Text style={[styles.normalTabText, selectedTab === 'Plain View' && styles.selectedTabText]}>
              Plain View
            </Text>
            <View style={[styles.underline,selectedTab === 'Plain View' && styles.underlineVisible]}/>
          </TouchableOpacity>

          <TouchableOpacity style={styles.list} onPress={() => setSelectedTab('Graph View')}>
            <Text style={[styles.normalTabText, selectedTab === 'Graph View' && styles.selectedTabText]}>
              Graph View
            </Text>
            <View style={[styles.underline,selectedTab === 'Graph View' && styles.underlineVisible]}/>
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

    </View>
  )

}


