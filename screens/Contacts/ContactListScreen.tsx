import { View, Text, FlatList, Image} from 'react-native';
import { styles } from './styles';

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
  {uid: '4', firstName: 'Hervé', lastName: 'Delamontagne', description: 'Description, description, description', interests: ['running'], qualifications: ['bowling']},
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

  const renderContact = ({ item } : { item : Contact }) => (
    <View style={styles.cardContainer}>
      <Image
        source={{ uri: 'assets/icon.png' }} // Replace with your image path
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{item.firstName}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  )

  return (
    <View>  

      <FlatList
        data={dummyData}
        renderItem={renderContact}
        keyExtractor={(contact) => contact.uid}
      />

    </View>
  )
}


