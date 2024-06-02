import React from "react"
import { View, Text, FlatList } from "react-native"
import { User } from "../../../types/User"
import styles from "./styles"
import { globalStyles } from "../../../assets/global/globalStyles"

interface ProfileInterestsProps {
  user: User
}

const Interest = ({ interest }: { interest: string }) => (
  <View style={styles.interestButton}>
    <Text style={[styles.interestText, globalStyles.text]}>{interest}</Text>
  </View>
)

export const xProfileInterests = ({ user }: ProfileInterestsProps) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={user.selectedInterests}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <Interest interest={item} />}
        numColumns={2}
        style={styles.interestsGrid}
      />
    </View>
  )
}
