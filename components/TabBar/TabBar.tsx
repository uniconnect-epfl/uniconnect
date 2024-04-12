import { BottomTabBarProps } from "@react-navigation/bottom-tabs"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { View, Text, Pressable } from "react-native"
import { styles } from "./styles"
import { peach } from "../../assets/colors/colors"
import { Ionicons } from "@expo/vector-icons"
import { globalStyles } from "../../assets/global/globalStyles"

type IconName = "home" | "home-outline" | "duplicate" | "duplicate-outline" | "compass" | "compass-outline"

export const TabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const insets = useSafeAreaInsets()

  return (
    <View style={[styles.tabBar, { paddingBottom: insets.bottom }]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key]
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel.toString()
            : options.title !== undefined
              ? options.title
              : route.name

        const focused = state.index === index

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true
          })
          if (!focused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, params: {}, merge: true })
          }
        }

          const size = focused? 32 : 24
          const opacity = focused? 1 : 0.6
          let iconName : IconName = "home"

          if (route.name === "Home")
          iconName = focused? "home" : "home-outline"
          if (route.name === "Connections")
          iconName = focused? "duplicate" : "duplicate-outline"
          if (route.name === "Explore")
            iconName = focused? "compass" : "compass-outline"         
          
          return (
            <Pressable
              onPress={onPress}
              key={route.key}
              style={[styles.button, { opacity }]}
            >
            <View style={styles.iconContainer}>
              <Ionicons name={iconName} size={size} color={peach}/>
            </View>
            <Text style={[styles.text, globalStyles.text]}>{label}</Text>
          </Pressable>
          )
      })}
    </View>
  )
}