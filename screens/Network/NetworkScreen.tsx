import React, { SetStateAction, useEffect, useState } from "react"
import { View } from "react-native"
import { styles } from "./styles"
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
import LoadingScreen from "../Loading/LoadingScreen"

interface NetworkScreenProps {
  navigation: NavigationProp<ParamListBase>
}

const NetworkScreen = ({ navigation }: NetworkScreenProps) => {
  const [graph, setGraph] = useState<Graph>()
  const [user, setUser] = useState<User | null>(null)
  const [userId, setUserId] = useState<string | undefined>(undefined)

  const [loaded, setLoaded] = useState(false)

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
  const [contacts, setContacts] = useState<Contact[] | null>(null)

  useEffect(() => {
    setUserId(getAuth().currentUser?.uid ?? "fwLsAGVKvqZl3gb0S28bDtN6Yvd2")
  }, [navigation])

  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        setUser(await getUserData(userId))
      }
    }
    fetchData()
  }, [userId])

  useEffect(() => {
    if (user) {
      const contact: Contact = {
        uid: userId ?? "-1",
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      loadGraphData(userId, userContact, contacts).then((graph) => {
        setGraph(graph)
      })
    }
  }, [contacts])

  useEffect(() => {
    if (graph && !loaded) {
      setLoaded(true)
    }
  }, [graph])

  const [selectedTab, setSelectedTab] = useState("Graph")

  return (
    <View style={styles.container}>
      <SectionTabs
        tabs={["Graph", "List"]}
        startingTab="Graph"
        onTabChange={(tab: SetStateAction<string>) => {
          setSelectedTab(tab)
        }}
      />
      {!loaded && <LoadingScreen />}

      {loaded && selectedTab === "Graph" && graph && userId && (
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
      {loaded && selectedTab === "List" && contacts && (
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
