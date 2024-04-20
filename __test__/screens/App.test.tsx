import React from 'react'
import { render } from '@testing-library/react-native'
import App from '../../App'

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

describe('App', () => {
  
  it('renders correctly', () => {
    const component = render(<App />)
    expect(component).toBeTruthy()
  })
  
})