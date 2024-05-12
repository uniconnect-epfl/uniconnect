import { View, Text } from "react-native"
import { styles } from "./styles"
import React, { useEffect, useState } from "react"
import { getAuth } from "firebase/auth"
import { User } from "../../../types/User"
import { getUserData } from "../../../firebase/User"
import LoadingScreen from "../../Loading/LoadingScreen"

export const ProfileEvents = () => {
  const userId = getAuth().currentUser?.uid
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      if (userId) {
        setUser(await getUserData(userId))
        const eventsId = user?.events
        console.log(eventsId)

      }
      setLoading(false)
    }
    fetchData()
  }, [userId])
  
  if (loading || !user) {
    return <LoadingScreen />
  }
  return (
    <View style={styles.container}>
      <Text>profile events</Text>
    </View>
  )
}
