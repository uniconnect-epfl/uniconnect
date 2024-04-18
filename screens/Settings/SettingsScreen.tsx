import { View, Text, TouchableOpacity } from "react-native"
import { styles } from "./styles"
import { useNavigation } from "@react-navigation/native"

export const SettingsScreen = () => {
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backArrow}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Announcements - View</Text>
      </View>
      <View style={styles.menuItem}>
        <Text style={styles.menuItemText}>ACCOUNT CENTER</Text>
      </View>
      <View style={styles.menuItem}>
        <Text style={styles.menuItemText}>LANGUAGE</Text>
      </View>
      <View style={styles.menuItem}>
        <Text style={styles.menuItemText}>NOTIFICATIONS</Text>
      </View>
      <View style={styles.menuItem}>
        <Text style={styles.menuItemText}>HELP</Text>
      </View>
      <View style={styles.menuItem}>
        <Text style={styles.menuItemText}>ABOUT</Text>
      </View>
      <View style={styles.menuItem}>
        <Text style={styles.menuItemText}>LOG OUT</Text>
      </View>
    </View>
  )
}