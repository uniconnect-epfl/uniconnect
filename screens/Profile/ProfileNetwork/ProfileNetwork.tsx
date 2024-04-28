import { View, Text, Image } from "react-native"
import { styles } from "./styles"
import React, { useState } from "react"
import { FlatList, TextInput } from "react-native-gesture-handler"
import { Ionicons } from "@expo/vector-icons"
import { globalStyles } from "../../../assets/global/globalStyles"
import { mockContacts } from "../../Contacts/mockContacts"
import { Contact } from "../../Contacts/Contact"

const RenderOneContact = ({ item }: { item: Contact }) => (
  <View style={styles.contactCard}>
    <View style={styles.horizontalContainer}>
      {item.profilePictureUrl ? (
        <Image
          style={styles.profilePicture}
          source={{ uri: item.profilePictureUrl }}
        />
      ) : (
        <View style={styles.profilePicture}>
          <Ionicons name="person" size={30} color="black" />
        </View>
      )}
      <Text
        style={[globalStyles.smallText, styles.description]}
        numberOfLines={4}
        ellipsizeMode="tail"
      >
        {item.description}
      </Text>
    </View>

    <View style={styles.nameContainer}>
      <Text style={globalStyles.boldText}>{item.firstName}</Text>
      <Text style={globalStyles.text}>friend</Text>
    </View>
  </View>
)

export const ProfileNetwork = () => {
  const [filteredContacts, setFilteredContacts] = useState(mockContacts)
  const [searchText, setSearchText] = useState("")

  const handleSearch = (text: string) => {
    setSearchText(text)
    if (text) {
      const filtered = mockContacts.filter((contact) =>
        `${contact.firstName} ${contact.lastName}`
          .toLowerCase()
          .includes(text.toLowerCase())
      )
      setFilteredContacts(filtered)
    } else {
      setFilteredContacts(mockContacts)
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search..."
        value={searchText}
        onChangeText={handleSearch}
      />

      <FlatList
        style={styles.list}
        data={filteredContacts}
        renderItem={RenderOneContact}
        keyExtractor={(item) => item.uid}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
    </View>
  )
}
