import React from 'react'
import { render } from '@testing-library/react-native'
import { ProfileEvents } from '../../../../screens/Profile/ProfileEvents/ProfileEvents'


jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
)

jest.mock("firebase/auth", () => ({
  getReactNativePersistence: jest.fn(() => ({})),
  initializeAuth: jest.fn(() => ({})),
  onAuthStateChanged: jest.fn(() => ({ uid: "123" })),
  getAuth: jest.fn(() => ({ currentUser: { uid: "123" } })),
}))

describe('ProfileEvents', () => {
  
  it('renders correctly', () => {
    const component = render(<ProfileEvents />)
    expect(component).toBeTruthy()
  })
  
})