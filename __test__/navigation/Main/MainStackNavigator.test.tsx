import React from 'react'
import { render } from '@testing-library/react-native'
import { NavigationContainer } from '@react-navigation/native'
import MainStackNavigator from '../../../navigation/Main/MainStackNavigator'
import { Auth, User } from 'firebase/auth'

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
)

jest.mock("firebase/auth", () => ({
  getReactNativePersistence: jest.fn(() => ({} as Auth)),
  initializeAuth: jest.fn(() => ({} as Auth)),
  onAuthStateChanged: jest.fn(() => ({uid: '123'} as User)),
}))

describe('RegistrationStackNavigator', () => {
    it('renders the stack navigator with expected initial route', () => {
        const component = render(
            <NavigationContainer>
                <MainStackNavigator/>
            </NavigationContainer>
        )
        expect(component).toBeTruthy()
    })
})
