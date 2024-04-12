import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Image, Pressable, View } from "react-native"
import { styles } from "./styles"
import { useNavigation } from "@react-navigation/native"
import { Ionicons } from "@expo/vector-icons"
import { peach } from "../../assets/colors/colors"

export const Header = () => {
  const insets = useSafeAreaInsets()
  const navigation = useNavigation()

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Pressable onPress={() => navigation.navigate("Profile" as never)}>
        <Ionicons name="person" size={26} color={peach}/>
      </Pressable>
      <Image source={require("../../assets/icon.png")} style={styles.image}/>
      <Pressable onPress={() => navigation.navigate("Settings" as never)}>
        <Ionicons name="settings" size={26} color={peach}/>
      </Pressable>
    </View>
  )
}