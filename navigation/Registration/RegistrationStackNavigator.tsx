import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import OnboardingScreen from "../../screens/Onboarding/OnboardingScreen"
import InformationScreen from "../../screens/Registration/InformationScreen/InformationScreen"
import InterestsScreen from "../../screens/Registration/InterestsScreen/InterestsScreen"
import HomeTabNavigator from "../../navigation/Home/HomeTabNavigator"
import { MyProfileScreen } from "../../screens/Profile/MyProfileScreen/MyProfileScreen"
import { SettingsScreen } from "../../screens/Settings/SettingsScreen"
import AuthenticationScreen from "../../screens/Registration/AuthenticationScreen/AuthenticationScreen"
import { MyQrCodeScreen } from "../../screens/Profile/MyQrCode/MyQrCodeScreen"
import { UpdateMyProfileScreen } from "../../screens/Profile/UpdateMyProfile/UpdateMyProfileScreen"
import ExternalProfileScreen from "../../screens/Profile/ExternalProfileScreen/ExternalProfileScreen"

const Stack = createStackNavigator()

// return  the StackNavigation that will be called in the app to allow the user to Login/Register
const RegistrationStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="Onboarding">
      <Stack.Screen
        name="Onboarding"
        component={OnboardingScreen}
        options={{ headerShown: false }} // Set options as needed, i.e hiding the header
      />
      <Stack.Screen
        name="Information"
        component={InformationScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Interests"
        component={InterestsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Authentication"
        component={AuthenticationScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HomeTabs"
        component={HomeTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Profile"
        component={MyProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MyQR"
        component={MyQrCodeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UpdateProfile"
        component={UpdateMyProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ExternalProfile"
        component={ExternalProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

export default RegistrationStackNavigator
