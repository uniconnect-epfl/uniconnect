import React from "react"
import { View, Text, TouchableOpacity, Alert } from "react-native"
import { styles } from "./styles"
import { useNavigation } from "@react-navigation/native"
import { Logout } from "../../firebase/Logout"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { BackArrow } from "../../components/BackArrow/BackArrow"

export const SettingsScreen = () => {
  const navigation = useNavigation()
  const insets = useSafeAreaInsets()
  type MenuItem = {
    title: string
    action: () => Promise<void> | void
  }

  const pressPlaceholder = () => Alert.alert("Coming soon")

  const menuItems: MenuItem[] = [
    { title: "LANGUAGE", action: pressPlaceholder  },
    { title: "NOTIFICATIONS", action: pressPlaceholder },
    { title: "HELP", action: pressPlaceholder },
    { title: "ABOUT", action: () => navigation.navigate("About" as never) },
    { title: "LOG OUT", action: Logout },
  ]

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <BackArrow />
      <View style={styles.header}/>
      <View style={styles.itemsContainer}>
        {menuItems.map((menuItem, index) => (
          <TouchableOpacity
            onPress={menuItem.action}
            style={[styles.menuItem, index === 0 && styles.firstMenuItem]}
            key={menuItem.title}
          >
            <Text style={styles.menuItemText}>{menuItem.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}
