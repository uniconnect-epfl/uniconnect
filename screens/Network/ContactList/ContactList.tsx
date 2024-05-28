import React, { useEffect, useState } from "react"
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native"
import { styles } from "./styles"
import { Ionicons } from "@expo/vector-icons"
import { globalStyles } from "../../../assets/global/globalStyles"
import { black } from "../../../assets/colors/colors"
import { Contact } from "../../../types/Contact"
import InputField from "../../../components/InputField/InputField"

interface ContactListProps {
  onContactPress: (uid: string) => void
  contacts: Contact[]
  loaded: boolean
}

const ContactList = ({
  onContactPress,
  contacts,
  loaded,
}: ContactListProps) => {
  const [filteredContacts, setFilteredContacts] = useState(contacts)
  const [searchText, setSearchText] = useState("")

  const [display, setDisplay] = useState(false)

  useEffect(() => {
    if (loaded) {
      setTimeout(() => {
        setDisplay(true)
      }, 2000)
    }
  }, [loaded])
  const handleSearch = (text: string) => {
    setSearchText(text)
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

  const RenderOneContact = ({ item }: { item: Contact }) => (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => onContactPress(item.uid)}
    >
      {item.profilePictureUrl ? (
        <Image
          style={styles.profilePicture}
          source={{ uri: item.profilePictureUrl }}
        />
      ) : (
        <View style={styles.profilePicture}>
          <Ionicons name="person" size={50} color={black} />
        </View>
      )}
      <View style={styles.informationsContainer}>
        <View>
          <Text style={globalStyles.boldText}>
            {item.firstName + " " + item.lastName}{" "}
          </Text>
          <Text style={globalStyles.text}>Friend</Text>
        </View>
      </View>
    </TouchableOpacity>
  )

  return (
    <TouchableWithoutFeedback
      onPress={() => Keyboard.dismiss()}
      testID="touchable"
    >
      <View style={styles.container}>
        <InputField
          placeholder="Search..."
          value={searchText}
          onChangeText={handleSearch}
          onSubmitEditing={() => {}}
        />

        {!display && (
          <View style={styles.loadingScreen}>
            <Image source={require("../../../assets/splash.gif")} />
          </View>
        )}
        {
          <FlatList
            style={styles.listContainer}
            data={filteredContacts}
            renderItem={RenderOneContact}
            keyExtractor={(contact) => contact.uid}
          />
        }
      </View>
    </TouchableWithoutFeedback>
  )
}

export default ContactList
