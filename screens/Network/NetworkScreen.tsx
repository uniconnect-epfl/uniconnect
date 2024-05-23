import React, { SetStateAction, useEffect, useState } from "react"
import { View } from "react-native"
import { styles } from "./styles"
import SectionTabs from "../../components/SectionTabs/SectionTabs"
import {
  NavigationProp,
  ParamListBase,
  useFocusEffect,
} from "@react-navigation/native"
import ContactList from "./ContactList/ContactList"
import ContactGraph, {
  createContactListFromUsers,
} from "./ContactGraph/ContactGraph"
import Graph from "../../components/Graph/Graph"
import { Contact } from "../../types/Contact"

import { User } from "../../types/User"
import { getUserData } from "../../firebase/User"
import { getAuth } from "firebase/auth"
import {
  destroyGraphFileIfExists,
  loadGraphData,
} from "../../components/Graph/GraphFileFunctions"
import { showErrorToast } from "../../components/ToastMessage/toast"

interface NetworkScreenProps {
  navigation: NavigationProp<ParamListBase>
}

const NetworkScreen = ({ navigation }: NetworkScreenProps) => {
  const [graph, setGraph] = useState<Graph>()
  const [user, setUser] = useState<User | null>(null)
  const [userId, setUserId] = useState<string | undefined>(undefined)

  const [loaded, setLoaded] = useState(false)

  const [navChange, setNavChange] = useState(false)

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

  const fetchData = async (userId: string) => {
    const user = await getUserData(userId)
    setUser(user)
  }

  useFocusEffect(
    React.useCallback(() => {
      if (!userId) {
        setUserId(getAuth().currentUser?.uid)
      }
    }, [])
  )

  useEffect(() => {
    if (userId) {
      fetchData(userId)
    }
  }, [userId])

  useEffect(() => {
    if (user) {
      const contact: Contact = {
        uid: userId ?? "-1",
        firstName: user?.firstName ?? "",
        lastName: user?.lastName ?? "",
        profilePictureUrl: user?.profilePicture ?? "",
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
      if (contacts.length === 0) {
        showErrorToast("You don't have any friends yet!")
      } else {
        loadGraphData(userId, userContact, contacts).then((graph) => {
          setGraph(graph)
        })
      }
    }
  }, [contacts])

  useEffect(() => {
    if (graph && !loaded) {
      setLoaded(true)
    }
  }, [graph])

  const [selectedTab, setSelectedTab] = useState("Graph")

  const friendListUpdated = async () => {
    setLoaded(false)
    destroyGraphFileIfExists()
    if (userId) {
      await fetchData(userId)
    }
  }

  return (
    <View style={styles.container}>
      <SectionTabs
        tabs={["Graph", "List"]}
        startingTab="Graph"
        onTabChange={(tab: SetStateAction<string>) => {
          setNavChange(!navChange)
          if (tab === "Graph") {
            setSelectedTab("Graph")
          }
        }}
      />
      {selectedTab === "Graph" && graph && userId && (
        <ContactGraph
          onContactPress={(uid) => {
            navigation.navigate("ExternalProfile", {
              externalUserUid: uid,
              callback: friendListUpdated,
            })
          }}
          graph={graph}
          userId={userId}
          userContact={userContact}
          loaded={loaded}
          navChange={navChange}
          changeTab={() => setSelectedTab("List")}
        />
      )}
      {selectedTab === "List" && contacts && (
        <ContactList
          onContactPress={(uid) =>
            navigation.navigate("ExternalProfile", {
              externalUserUid: uid,
            })
          }
          contacts={contacts}
          loaded={loaded}
        />
      )}
    </View>
  )
}

export default NetworkScreen
