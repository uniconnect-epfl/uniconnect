import React from "react"
import { fireEvent, render, waitFor } from "@testing-library/react-native"
import ViewEventScreen from "../../../../screens/ViewDetails/ViewEventScreen/ViewEventScreen"
import { NavigationContainer } from "@react-navigation/native"

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
)

jest.mock("firebase/auth", () => ({
  getReactNativePersistence: jest.fn(() => ({})),
  initializeAuth: jest.fn(() => ({})),
  onAuthStateChanged: jest.fn(() => ({ uid: "123" })),
  getAuth: jest.fn(() => ({ currentUser: { uid: "123" } }))
}))

jest.mock("../../../../firebase/User", () => ({
  getUserData: jest.fn().mockResolvedValue({ uid: "123", firstName: "John", lastName: "Doe" }),
  updateUserEvents: jest.fn().mockResolvedValue(true)
}))

jest.mock("../../../../firebase/ManageEvents", () => ({
  getEventData: jest.fn().mockResolvedValue({ uid: "123", title: "Event", location: "location", point: { x: 40.712776, y: -74.005974 }, date: new Date().toISOString(), host: "123", participants: ["123"], description: "description", imageUrl: "imageUrl" }),
  updateEventData: jest.fn().mockResolvedValue(true)
}))


jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native")
  return {
    ...actualNav,
    useRoute: () => ({
      params: { eventUid: "123" },
    }),
  }
})

//mock an alert with jest
global.alert = jest.fn()

describe("ViewEventScreen", () => {

  it("renders correctly", () => {
    const component = render(
      <NavigationContainer>
        <ViewEventScreen />
      </NavigationContainer>
    )
    expect(component).toBeTruthy()
  })

  it("can click on participate", async () => {
    const { getByText } = render(
      <NavigationContainer>
        <ViewEventScreen />
      </NavigationContainer>
    )
    await waitFor(() => {
      expect(getByText("Participate")).toBeTruthy()
    })

    fireEvent.press(getByText("Participate"))
  })

})