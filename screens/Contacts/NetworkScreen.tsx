import React, { SetStateAction, useEffect, useState } from "react"
import { View } from "react-native"
import { styles } from "./styles"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import SectionTabs from "../../components/SectionTabs/SectionTabs"
import { NavigationProp, ParamListBase } from "@react-navigation/native"
import ContactList from "./ContactList/ContactList"
import ContactGraph, {
  createContactListFromUsers,
} from "./ContactGraph/ContactGraph"
import Graph from "../../components/Graph/Graph"
import { Contact } from "../../types/Contact"

import { User } from "../../types/User"
import { getUserData } from "../../firebase/User"
import { getAuth } from "firebase/auth"
import { loadGraphData } from "../../components/Graph/GraphFileFunctions"

interface NetworkScreenProps {
  navigation: NavigationProp<ParamListBase>
}

const NetworkScreen = ({ navigation }: NetworkScreenProps) => {
  const [graph, setGraph] = useState<Graph>()
  const [user, setUser] = useState<User | null>(null)
  const [userId, setUserId] = useState<string | undefined>(undefined)

  const [userContact, setUserContact] = useState<Contact>({
    uid: "-1",
    firstName: "",
    lastName: "",
    profilePictureUrl: "",
    description: "",
    location: "",
    interests: [""],
    events: [""],
    friends: [""],
  })

  const [friends, setFriends] = useState<string[] | null>(null)
  const [contacts, setContacts] = useState<Contact[]>([])

  const initializeContacts = async () => {
    const contacts = await createContactListFromUsers(friends ?? [])
    setContacts(contacts)
  }
  useEffect(() => {
    if (friends) {
      console.log("Friends set: ", friends)
      initializeContacts()
    }
  }, [friends])

  useEffect(() => {
    console.log("Contacts set: ", contacts)
    if (contacts.length > 0) {
      loadGraphData(userId ?? "-1", userContact, contacts).then((graph) => {
        setGraph(graph)
      })
    }
  }, [contacts])

  useEffect(() => {
    let tempUserId = getAuth().currentUser?.uid
    if (tempUserId === undefined) {
      tempUserId = "fwLsAGVKvqZl3gb0S28bDtN6Yvd2"
    }
    setUserId(tempUserId)
  }, [navigation])

  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        console.log("User ID set: ", userId)
        setUser(await getUserData(userId))
      }
    }
    fetchData()
  }, [userId])

  useEffect(() => {
    if (user) {
      console.log("User set: ", user)
      const contact: Contact = {
        uid: user?.uid ?? "-1",
        firstName: user?.firstName ?? "",
        lastName: user?.lastName ?? "",
        profilePictureUrl:
          "https://t3.ftcdn.net/jpg/04/65/28/08/360_F_465280897_8nL6xlvBwUcLYIQBmyX0GO9fQjDwNYtV.jpg",
        description: user?.description ?? "",
        location: user?.location ?? "",
        interests: user?.selectedInterests ?? [""],
        events: [""],
        friends: user?.friends ?? [],
      }
      setUserContact(contact)
    }
    if (user?.friends) {
      setFriends(user?.friends)
    }
  }, [user])

  const [selectedTab, setSelectedTab] = useState("Graph")
  const insets = useSafeAreaInsets()

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <SectionTabs
        tabs={["Graph", "List"]}
        startingTab="Graph"
        onTabChange={(tab: SetStateAction<string>) => {
          setSelectedTab(tab)
        }}
      />

      {selectedTab === "Graph" && graph && userId && (
        <ContactGraph
          onContactPress={(uid) =>
            navigation.navigate("ExternalProfile", {
              externalUserUid: uid,
            })
          }
          graph={graph}
          userId={userId}
          userContact={userContact}
        />
      )}
      {selectedTab === "List" && (
        <ContactList
          onContactPress={(uid) =>
            navigation.navigate("ExternalProfile", {
              externalUserUid: uid,
            })
          }
          contacts={contacts}
        />
      )}
    </View>
  )
}

export default NetworkScreen
