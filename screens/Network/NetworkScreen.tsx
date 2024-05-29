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

import { useFullScreen } from "../../navigation/Home/HomeTabNavigator"

interface NetworkScreenProps {
  navigation: NavigationProp<ParamListBase>
}

const NetworkScreen = ({ navigation }: NetworkScreenProps) => {
  const [graph, setGraph] = useState<Graph>()
  const [user, setUser] = useState<User | null>(null)
  const [userId, setUserId] = useState<string | undefined>(undefined)

  const [loaded, setLoaded] = useState(false)

  const [fullScreen, setFullScreen] = useState(false)

  const { switchToFullScreen, switchFromFullScreen } = useFullScreen()

  const fullScreenCallback = () => {
    setFullScreen(!fullScreen)
    if (fullScreen) {
      switchFromFullScreen()
    } else {
      switchToFullScreen()
    }
  }

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
  const [noFriends, setNoFriends] = useState<boolean | null>(null)

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
    setFriends(user?.friends ?? [])
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
        setNoFriends(true)
        setGraph({
          nodes: [],
          links: [],
          userId: "",
        })
      } else {
        setNoFriends(false)
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
      {!fullScreen && (
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
      )}
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
          noFriends={noFriends}
          navChange={navChange}
          changeTab={() => setSelectedTab("List")}
          fullScreenCallback={fullScreenCallback}
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
          noFriends={noFriends}
        />
      )}
    </View>
  )
}

export default NetworkScreen
