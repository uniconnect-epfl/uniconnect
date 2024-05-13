import React from "react"
import { fireEvent, render, waitFor } from "@testing-library/react-native"
import ViewEventScreen from "../../../../screens/ViewDetails/ViewEventScreen/ViewEventScreen"

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
)

jest.mock("firebase/auth", () => ({
  getReactNativePersistence: jest.fn(() => ({})),
  initializeAuth: jest.fn(() => ({})),
  onAuthStateChanged: jest.fn(() => ({uid: "123"})),
  getAuth: jest.fn(() => ({currentUser: {uid: "123"}}))
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

jest.mock("../../../../firebase/User", () => ({
  getUserData: jest.fn().mockResolvedValue({
    uid: "1",
    title: "Title of the event right at the start",
    location: "Central Park",
    point: {
      x : 40.712776,
      y : -74.005974
    },
    date: new Date(), // current date and time
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dolor morbi non arcu risus quis. Mattis molestie a iaculis at. Tristique risus nec feugiat in fermentum posuere urna. Quisque sagittis purus sit amet volutpat consequat mauris nunc. Sapien eget mi proin sed libero. Condimentum mattis pellentesque id nibh tortor id aliquet lectus proin. Suspendisse faucibus interdum posuere lorem. In mollis nunc sed id semper risus. Amet consectetur adipiscing elit ut aliquam purus. Integer enim neque volutpat ac.    ",
    imageUrl: ""
  }),
}))

describe("ViewEventScreen", () => {
  
  it("renders correctly", () => {
    const component = render(<ViewEventScreen />)
    expect(component).toBeTruthy()
  })

  it("can click on participate", async () => {
    const { getByText } = render(<ViewEventScreen />)
    await waitFor(() => {
      fireEvent.press(getByText("Participate"))
    })
  })
  
})