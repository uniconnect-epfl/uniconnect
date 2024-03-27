import { View, Text, FlatList } from 'react-native';
import { styles } from './styles';

type Contact = {
  uid: string,
  name: string,
}

const dummyData: Contact[] = [
  {uid: '10', name: 'Jocović'},
  {uid: '11', name: 'Stephanović'},
  {uid: '12', name: 'Bernardović'},
  {uid: '13', name: 'Vladimirović'},
  {uid: '14', name: 'Jocović'},
  {uid: '15', name: 'Stephanović'},
  {uid: '16', name: 'Bernardović'},
  {uid: '17', name: 'Vladimirović'},
  {uid: '18', name: 'Jocović'},
  {uid: '19', name: 'Stephanović'},
  {uid: '20', name: 'Bernardović'},
  {uid: '21', name: 'Vladimirović'},
  {uid: '22', name: 'Jocović'},
  {uid: '23', name: 'Stephanović'},
  {uid: '24', name: 'Bernardović'},
  {uid: '25', name: 'Vladimirović'},
]

export const ContactListScreen = () => {

  const renderContact = ({ item } : { item : Contact }) => (
    <View
      style={styles.contact}>
      <Text>{item.name}</Text>
    </View>
  )

  return (
    <FlatList
      data={dummyData}
      renderItem={renderContact}
      keyExtractor={(contact) => contact.uid}
    />
  )
}


