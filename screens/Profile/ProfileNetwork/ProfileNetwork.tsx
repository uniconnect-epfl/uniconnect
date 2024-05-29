import { View, Text, Image } from "react-native"
import { styles } from "./styles"
import React, { useEffect, useState } from "react"
import { FlatList } from "react-native-gesture-handler"
import { Ionicons } from "@expo/vector-icons"
import { globalStyles } from "../../../assets/global/globalStyles"
import { mockContacts } from "../../Network/mockContacts"
import { Contact } from "../../../types/Contact"
import InputField from "../../../components/InputField/InputField"
import { User } from "../../../types/User"
import { createContactListFromUsers } from "../../Network/ContactGraph/ContactGraph"

interface ProfileNetworkProps {
  user?: User
}
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
      <Text
        style={globalStyles.boldText}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {item.firstName} {item.lastName}
      </Text>
    </View>
  </View>
)

export const ProfileNetwork = ({ user }: ProfileNetworkProps) => {
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([])

  const [friends, setFriends] = useState<string[] | null>(null)
  const [contacts, setContacts] = useState<Contact[] | null>(null)

  useEffect(() => {
    if (user) {
      setFriends(user?.friends ?? [])
    }
  }, [user])

  useEffect(() => {
    const createList = async () => {
      const contacts = await createContactListFromUsers(friends ?? [])
      setContacts(contacts)
    }
    if (friends) {
      if (friends.length > 0) {
        createList()
      } else {
        setContacts([])
      }
    }
  }, [friends])

  useEffect(() => {
    if (contacts) {
      setFilteredContacts(contacts)
    }
  }, [contacts])

  const [searchText, setSearchText] = useState("")

  const handleSearch = (text: string) => {
    setSearchText(text)
    if (contacts) {
      if (text) {
        const filtered = contacts.filter((contact) =>
          `${contact.firstName} ${contact.lastName}`
            .toLowerCase()
            .includes(text.toLowerCase())
        )
        setFilteredContacts(filtered)
      } else {
        setFilteredContacts(contacts)
      }
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <InputField
          placeholder="Search..."
          value={searchText}
          onChangeText={handleSearch}
          onSubmitEditing={() => {}}
        />
      </View>

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
