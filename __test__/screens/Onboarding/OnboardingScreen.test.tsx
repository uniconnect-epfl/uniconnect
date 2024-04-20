import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import OnboardingScreen from '../../../screens/Onboarding/OnboardingScreen'
import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context'

const mockNavigate = jest.fn()

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: mockNavigate,
    }),
  }
})

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

jest.mock('react-native-safe-area-context', () => {
  const inset = {top: 0, right: 0, bottom: 0, left: 0}
  return {
    SafeAreaProvider: jest.fn(({children}) => children),
    SafeAreaConsumer: jest.fn(({children}) => children(inset)),
    useSafeAreaInsets: jest.fn(() => inset),
    useSafeAreaFrame: jest.fn(() => ({x: 0, y: 0, width: 390, height: 844})),
  }
})

describe('OnboardingScreen', () => {
  it('renders the onboarding screen', () => {
    const { getByPlaceholderText, getByText } = render(
      <SafeAreaProvider>
        <NavigationContainer>
          <OnboardingScreen />
        </NavigationContainer>
      </SafeAreaProvider>
    )

    expect(getByPlaceholderText('Username or email')).toBeTruthy()
    expect(getByPlaceholderText('Password')).toBeTruthy()
    expect(getByText('Log In')).toBeTruthy()
    expect(getByText('Forgot password?')).toBeTruthy()
    expect(getByText('Continue with google')).toBeTruthy()
    expect(getByText('Dont have an account?')).toBeTruthy()
  })

  it('navigates to the home screen on log in press', () => {
    const { getByText } = render(
      <SafeAreaProvider>
        <NavigationContainer>
          <OnboardingScreen />
        </NavigationContainer>
      </SafeAreaProvider>
    )
    const loginButton = getByText('Log In')

    fireEvent.press(loginButton)
    expect(loginButton).toBeTruthy()
  })

  it('shows a continue with Google option', () => {
    const { getByText } = render(
      <SafeAreaProvider>
        <NavigationContainer>
          <OnboardingScreen />
        </NavigationContainer>
      </SafeAreaProvider>
    )
    const googleButton = getByText('Continue with google')

    fireEvent.press(googleButton)
    expect(googleButton).toBeTruthy()
  })

  it('navigates to sign up screen on footer press', () => {
    const { getByText } = render(
      <SafeAreaProvider>
        <NavigationContainer>
          <OnboardingScreen />
        </NavigationContainer>
      </SafeAreaProvider>
    )
    const signUpButton = getByText('Sign Up')

    fireEvent.press(signUpButton)
    expect(mockNavigate).toHaveBeenCalledWith('Information')
  })
})
