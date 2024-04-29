import React from "react"
import { fireEvent, render, waitFor } from "@testing-library/react-native"
import { AddContactScreen } from "../../../screens/AddContact/AddContactScreen"

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
)

jest.mock("../../../firebase/User", () => ({
  getUserData: jest.fn(() => ({
    firstName: "John",
    lastName: "Doe",
    location: "London"
  }))
}))

jest.mock("firebase/auth", () => ({
  getReactNativePersistence: jest.fn(() => ({})),
  initializeAuth: jest.fn(() => ({})),
  onAuthStateChanged: jest.fn(() => ({uid: '123'})),
  getAuth: jest.fn(() => ({currentUser: {uid: '123'}}))
}))

jest.mock("@react-navigation/native", () => {
    const actualNav = jest.requireActual("@react-navigation/native")
    return {
      ...actualNav,
      useRoute: () => ({
        params: { uid: "123" },
      }),
    }
})

describe("AddContactScreen", () => {
  
  it("renders correctly", () => {
    const component = render(<AddContactScreen />)
    expect(component).toBeTruthy()
  })

  it("adding contact", async () => {
    const { getByText } = render(<AddContactScreen />)

    await waitFor(() => {
      const addButton = getByText("Add to contacts")
      fireEvent.press(addButton)
    // later test the adding
    })
  })
  
})