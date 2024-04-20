import React from 'react'
import { render } from '@testing-library/react-native'
import { NavigationContainer } from '@react-navigation/native'
import RegistrationStackNavigator from '../../../navigation/Registration/RegistrationStackNavigator'

jest.mock('@react-native-google-signin/google-signin', () => {
    return {
      GoogleSignin: {
        configure: jest.fn(),
        signIn: jest.fn(() => Promise.resolve({
          idToken: 'mock-id-token',
          accessToken: 'mock-access-token',
          user: {
            email: 'test@example.com',
            id: '123',
            name: 'Test User'
          }
        })),
        signOut: jest.fn(),
      }
    }
  })


describe('RegistrationStackNavigator', () => {
    it('renders the stack navigator with expected initial route', () => {
        const component = render(
            <NavigationContainer>
                <RegistrationStackNavigator />
            </NavigationContainer>
        )
        expect(component).toBeTruthy()
    })
})
