import React, { useState } from "react"
import { View, Text, TextInput, FlatList } from "react-native"
import styles from "./styles"
import { globalStyles } from "../../../assets/global/globalStyles"
import { Notification } from "../../../components/Notification/Notification"
import { BackArrow } from "../../../components/BackArrow/BackArrow"
import { useSafeAreaInsets } from "react-native-safe-area-context"

const messages = [
  {
    id: "1",
    name: "Jean Dujardin",
  },
  {
    id: "2",
    name: "Pierre Ninet",
  },
  // Repeat similar objects to create the list
]

const NotificationsScreen: React.FC = () => {
  const [search, setSearch] = useState("")
  const insets = useSafeAreaInsets()

  // Filter the notifications based on the search input
  const filteredMessages = messages.filter((message) =>
    message.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
    >
      <BackArrow />

      <Text style={[globalStyles.boldText, styles.headerText]}>
        Notifications
      </Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Search..."
        value={search}
        onChangeText={setSearch}
      />
      <FlatList
        data={filteredMessages}
        renderItem={({ item }) => (
          <Notification name={item.name} id={item.id} />
        )}
        keyExtractor={(item) => item.id}
        testID="notifications-flatlist"
      />
    </View>
  )
}

export default NotificationsScreen
