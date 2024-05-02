import React, { useEffect, useState } from "react"
import { createStackNavigator } from "@react-navigation/stack"
import OnboardingScreen from "../../screens/Onboarding/OnboardingScreen"
import InformationScreen from "../../screens/Registration/InformationScreen/InformationScreen"
import InterestsScreen from "../../screens/Registration/InterestsScreen/InterestsScreen"
import HomeTabNavigator from "../Home/HomeTabNavigator"
import { MyProfileScreen } from "../../screens/Profile/MyProfileScreen/MyProfileScreen"
import { SettingsScreen } from "../../screens/Settings/SettingsScreen"
import AuthenticationScreen from "../../screens/Registration/AuthenticationScreen/AuthenticationScreen"
import { MyQrCodeScreen } from "../../screens/Profile/MyQrCode/MyQrCodeScreen"
import { UpdateMyProfileScreen } from "../../screens/Profile/UpdateMyProfile/UpdateMyProfileScreen"
import ExternalProfileScreen from "../../screens/Profile/ExternalProfileScreen/ExternalProfileScreen"
import DescriptionScreen from "../../screens/Registration/DescriptionScreen/DescriptionScreen"
import EventCreationScreen from "../../screens/EventCreation/EventCreationScreen"
import { auth } from "../../firebase/firebaseConfig"
import { User, onAuthStateChanged } from "firebase/auth"
import LoadingScreen from "../../screens/Loading/LoadingScreen"
import MapsScreen from "../../screens/Maps/EventMap"
import { AddContactScreen } from "../../screens/AddContact/AddContactScreen"
import { isNewUser, storeInitialUserData } from "../../firebase/Registration"
import { RegistrationContext } from "../../contexts/RegistrationContext"

const Stack = createStackNavigator()

const MainStackNavigator: React.FC = () => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [date, setDate] = useState<Date>(new Date())
  const [location, setLocation] = useState("")
  const [description, setDescription] = useState("")
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const [fillOutProfile, setFillOutProfile] = useState(false)

  // Check the current auth status
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user)
        // If the user is new, check if they have filled out their profile
        if (await isNewUser(user.uid)) {
          // If they haven't (it means that they were using Google to sign in), should prompt them to fill it out
          if (firstName === "" || lastName === "") {
            setFillOutProfile(true)
          }
          // Otherwise, fill out the profile with the data that was already provided
          else {
            const email = user.email || ""
            await storeInitialUserData(
              user.uid,
              email,
              firstName,
              lastName,
              date,
              location,
              description,
              selectedInterests
            )
          }
        }
      } else {
        setUser(null)
      }
      setLoading(false)
    })
    return unsubscribe
  }, [date, description, firstName, lastName, location, selectedInterests])

  if (loading) {
    return <LoadingScreen />
  }
  return (
    <RegistrationContext.Provider
      value={{
        firstName,
        setFirstName,
        lastName,
        setLastName,
        date,
        setDate,
        location,
        setLocation,
        description,
        setDescription,
        selectedInterests,
        setSelectedInterests,
      }}
    >
      <Stack.Navigator
        initialRouteName={
          user ? ( "HomeTabs") : "Onboarding"
        }
      >
        {user ? (
          <>
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
              initialParams={{ fillOutProfile }}
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
            <Stack.Screen
              name="EventMap"
              component={MapsScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AddContact"
              component={AddContactScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="EventCreation"
              component={EventCreationScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="EventScreen"
              component={AddContactScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AnnouncementScreen"
              component={MapsScreen}
              options={{ headerShown: false }}
            />
            
          </>
        ) : (
          <>
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
              name="Description"
              component={DescriptionScreen}
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
          </>
        )}
      </Stack.Navigator>
    </RegistrationContext.Provider>
  )
}

export default MainStackNavigator
