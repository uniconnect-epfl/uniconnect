import React, { useEffect, useState } from "react"
import { createStackNavigator } from "@react-navigation/stack"
import OnboardingScreen from "../../screens/Onboarding/OnboardingScreen"
import InformationScreen from "../../screens/Registration/InformationScreen/InformationScreen"
import InterestsScreen from "../../screens/Registration/InterestsScreen/InterestsScreen"
import ExploreTabNavigator from "../Home/HomeTabNavigator"
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
import { isNewUser, storeInitialUserData } from "../../firebase/Registration"
import { RegistrationContext } from "../../contexts/RegistrationContext"
import EventScreen from "../../screens/Explore/EventScreen/EventScreen"
import ViewEventScreen from "../../screens/ViewDetails/ViewEventScreen/ViewEventScreen"
import ViewAnnoucementScreen from "../../screens/ViewDetails/ViewAnnouncementScreen/ViewAnnouncementScreen"
import { SelectLocationScreen } from "../../screens/SelectLocation/SelectLocationScreen"
import { AboutScreen } from "../../screens/Settings/AboutScreen/AboutScreen"
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
  const [fromGoogle, setFromGoogle] = useState(false)

  // Check the current auth status
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user)
        // If the user is new, check if they have filled out their profile
        if (await isNewUser(user.uid)) {
          // If they haven't (it means that they were using Google to sign in), should prompt them to fill it out
          if (firstName === "" || lastName === "") {
            setFromGoogle(true)
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
        user,
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
        fromGoogle,
        setFromGoogle,
      }}
    >
      <Stack.Navigator initialRouteName={user ? "ExploreTabs" : "Onboarding"}>
        {fromGoogle ? (
          <>
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
              name="Description"
              component={DescriptionScreen}
              options={{ headerShown: false }}
            />
          </>
        ) : user ? (
          <>
            <Stack.Screen
              name="ExploreTabs"
              component={ExploreTabNavigator}
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
              initialParams={{ fromGoogle }}
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
              name="EventCreation"
              component={EventCreationScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="EventScreen"
              component={EventScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AnnouncementScreen"
              component={MapsScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Description"
              component={DescriptionScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ViewEvent"
              component={ViewEventScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ViewAnnouncement"
              component={ViewAnnoucementScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SelectLocation"
              component={SelectLocationScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="About"
              component={AboutScreen}
              options={{ headerShown: false }}
            />
            
            <Stack.Screen
              name="EventInterests"
              component={InterestsScreen}
              options={{ headerShown: false }}
              initialParams={{ eventMode: true }}
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
