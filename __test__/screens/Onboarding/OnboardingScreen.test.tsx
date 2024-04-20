import React from 'react'
import { render, fireEvent, act, waitFor } from '@testing-library/react-native'
import OnboardingScreen from '../../../screens/Onboarding/OnboardingScreen'
import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
// Import Firebase modules
import 'firebase/auth'

const mockNavigate = jest.fn()
global.alert = jest.fn()

jest.mock('firebase/app', () => {
  const auth = {
    signInWithEmailAndPassword: jest.fn(() => Promise.resolve({
      user: {
        uid: '123',
        email: 'test@example.com'
      }
    })),
    signOut: jest.fn(() => Promise.resolve()),
    onAuthStateChanged: jest.fn()
  }

  const initializeApp = jest.fn(() => {
    return { auth: () => auth }
  })

  jest.mock('/Users/gustavecharles/Documents/epfl/ba6/SwEnt/uniconnect/firebase/firebaseConfig.ts', () => ({
    loginEmailPassword: jest.fn(() => Promise.resolve(true)), // Assuming loginEmailPassword returns true on successful login
  }));

  return {
    initializeApp,
    auth,
    apps: [], // Mimic the apps array to avoid "no-app" initialization errors
    getApps: jest.fn(() => []),
  }
})

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(() => ({
    signInWithEmailAndPassword: jest.fn(),
    signOut: jest.fn(),
    onAuthStateChanged: jest.fn(),
  })),
}))

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
  const inset = { top: 0, right: 0, bottom: 0, left: 0 }
  return {
    SafeAreaProvider: jest.fn(({ children }) => children),
    SafeAreaConsumer: jest.fn(({ children }) => children(inset)),
    useSafeAreaInsets: jest.fn(() => inset),
    useSafeAreaFrame: jest.fn(() => ({ x: 0, y: 0, width: 390, height: 844 })),
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

  it('on log in press, login successful navigates to the home screen', async () => {

    const { getByText } = render(
      <SafeAreaProvider>
        <NavigationContainer>
          <OnboardingScreen />
        </NavigationContainer>
      </SafeAreaProvider>
    )
    const loginButton = getByText('Log In')

    await act(async () => {
      fireEvent.press(loginButton)
    })

    await waitFor(() => {
      //expect navigation to be called'
      expect(mockNavigate).toHaveBeenCalledWith('HomeTabs')
    })
    

    expect(loginButton).toBeTruthy()
  })

  it('on Google Login press, login succesful navigates to the home screen', async () => {
    const { getByText } = render(
      <SafeAreaProvider>
        <NavigationContainer>
          <OnboardingScreen />
        </NavigationContainer>
      </SafeAreaProvider>
    )
    const googleButton = getByText('Continue with google')

    await act(async () => {
      fireEvent.press(googleButton)
    })

    await waitFor(() => {
      //expect navigation to be called'
      expect(mockNavigate).toHaveBeenCalledWith('HomeTabs')
    })
    
    expect(googleButton).toBeTruthy()

  })

  //on log in press, login failed alert is called
  it('on log in press, login failed alert is called',async () => {
    const { getByText } = render(
      <SafeAreaProvider>
        <NavigationContainer>
          <OnboardingScreen />
        </NavigationContainer>
      </SafeAreaProvider>
    )
    const loginButton = getByText('Log In')

    await act(async () => {
      fireEvent.press(loginButton)
    })
    expect(loginButton).toBeTruthy()

    await waitFor(() => {
    expect(alert).toHaveBeenCalledWith('Login failed!')
    })
  })

  it('navigates to sign up screen on footer press',async () => {
    const { getByText } = render(
      <SafeAreaProvider>
        <NavigationContainer>
          <OnboardingScreen />
        </NavigationContainer>
      </SafeAreaProvider>
    )
    const signUpButton = getByText('Sign Up')
    
    await act(async () => {
      fireEvent.press(signUpButton)
    })
    
    await waitFor(() => {
    expect(mockNavigate).toHaveBeenCalledWith('Information')
    })

    expect(signUpButton).toBeTruthy()

  })
})
