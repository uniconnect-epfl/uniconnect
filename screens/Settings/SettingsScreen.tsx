import React from "react"
import { View, Text, TouchableOpacity, Alert  } from "react-native"
import { styles } from "./styles"
import { useNavigation } from "@react-navigation/native"
import { Ionicons } from "@expo/vector-icons"
import { peach } from "../../assets/colors/colors"
import { Logout } from "../../firebase/Logout"

export const SettingsScreen = () => {
  const navigation = useNavigation()

  type MenuItem = {
    title: string;
    action: () => Promise<void>|void;
  };

  const pressPlaceholder = () => Alert.alert("Coming soon")

  const menuItems: MenuItem[] = [
    { title: "CREATE EVENT", action: () => navigation.navigate("EventCreation" as never) },
    { title: "LANGUAGE",  action: pressPlaceholder },
    { title: "NOTIFICATIONS", action: pressPlaceholder },
    { title: "HELP",  action: pressPlaceholder },
    { title: "ABOUT", action: pressPlaceholder },
    { title: "LOG OUT",  action: Logout }
  ]

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} testID="back-button">
          <Ionicons name="arrow-back-outline" size={24} color={peach} />
        </TouchableOpacity>
      </View>
      <View style={styles.itemsContainer}>
        {menuItems.map((menuItem, index) => (
          <TouchableOpacity onPress={menuItem.action} style={[styles.menuItem, index === 0 && styles.firstMenuItem]} key={menuItem.title}>
            <Text style={styles.menuItemText}>{menuItem.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}
