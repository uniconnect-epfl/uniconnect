import React from 'react'
import { render , waitFor} from '@testing-library/react-native'
import App from '../../App'
import { Auth } from 'firebase/auth'

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
)

jest.mock("firebase/auth", () => ({
  getReactNativePersistence: jest.fn(() => ({} as Auth)),
  initializeAuth: jest.fn(() => ({} as Auth)),
}))

jest.mock("expo-linking", () => ({
  createURL: jest.fn().mockImplementation((path) => `uniconnect://${path}`),
}))

describe('App', () => {
  
  it('renders correctly', async () => {
    await waitFor(async () => {
    const component = render(<App />)
    expect(component).toBeTruthy()
    })
  })
  
})