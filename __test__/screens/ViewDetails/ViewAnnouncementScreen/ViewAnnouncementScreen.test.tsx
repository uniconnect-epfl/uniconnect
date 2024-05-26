import React from "react"
import { render } from "@testing-library/react-native"
import ViewAnnoucementScreen from "../../../../screens/ViewDetails/ViewAnnouncementScreen/ViewAnnouncementScreen"
import { Point } from "react-native-maps"
import { Announcement } from "../../../../types/Annoucement"
import { NavigationContainer } from "@react-navigation/native"
import { SafeAreaProvider } from "react-native-safe-area-context"

// Create a dummy Point
const dummyPoint: Point = {
    x: 40.7128,
    y: -74.0060
}

// Create a dummy Announcement
const dummyAnnouncement: Announcement = {
    uid: "1",
    title: "Community Art Exhibition",
    location: "Downtown Community Center",
    point: dummyPoint,
    description: "Join us for an evening of art and conversation at our annual community art exhibition. Featuring works from local artists in a variety of mediums.",
    interests: ["art", "community", "local culture"],
    date: "2024-10-03T18:00:00Z"
}

jest.mock("@react-navigation/native", () => {
    const actualNav = jest.requireActual("@react-navigation/native")
    return {
      ...actualNav,
      useRoute: () => ({
        params: { announcement: dummyAnnouncement },
      }),
    }
})

jest.mock('react-native-safe-area-context', () => {
  const inset = {top: 0, right: 0, bottom: 0, left: 0}
  return {
    SafeAreaProvider: jest.fn(({children}) => children),
    SafeAreaConsumer: jest.fn(({children}) => children(inset)),
    useSafeAreaInsets: jest.fn(() => inset),
    useSafeAreaFrame: jest.fn(() => ({x: 0, y: 0, width: 390, height: 844})),
  }
})

describe("ViewAnnouncementScreen", () => {
  
  it("renders correctly", () => {
    const component = render(
      <SafeAreaProvider>
        <NavigationContainer>
          <ViewAnnoucementScreen />
        </NavigationContainer>
      </SafeAreaProvider>
      )
    expect(component).toBeTruthy()
  })
  
})