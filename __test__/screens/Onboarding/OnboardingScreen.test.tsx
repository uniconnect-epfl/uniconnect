import React from 'react'
import 'firebase/auth'
import { render, fireEvent, act, waitFor } from '@testing-library/react-native'
import OnboardingScreen from '../../../screens/Onboarding/OnboardingScreen'
import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import * as login from '../../../firebase/Login'

// Mocking modules
jest.mock('../../../firebase/Login', () => ({
  loginEmailPassword: jest.fn(),
}))

const mockNavigate = jest.fn()
global.alert = jest.fn()


jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: mockNavigate,
    }),
  }
})

// Setting up the Jest mock for GoogleSignin
jest.mock('@react-native-google-signin/google-signin', () => ({
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
    hasPlayServices: jest.fn(() => Promise.resolve(true)), // Make sure to mock this if it's being called
  }
}))

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
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    (login.loginEmailPassword as jest.Mock).mockResolvedValue(true)
  })

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
    (login.loginEmailPassword as jest.Mock).mockResolvedValue(true)

    const { getByText, getByPlaceholderText } = render(
      <SafeAreaProvider>
        <NavigationContainer>
          <OnboardingScreen />
        </NavigationContainer>
      </SafeAreaProvider>
    )
    const loginButton = getByText('Log In')

    fireEvent.changeText(getByPlaceholderText("Username or email"), 'test@example.com')
    fireEvent.changeText(getByPlaceholderText("Password"), 'password123')

    await act(async () => {
      fireEvent.press(loginButton)
    })

    await waitFor(() => {
      expect(login.loginEmailPassword).toHaveBeenCalled()
      expect(mockNavigate).toHaveBeenCalledWith('HomeTabs')
      expect(alert).not.toHaveBeenCalled()
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
      //expect(GoogleSignin.signIn).toHaveBeenCalled()
      expect(mockNavigate).toHaveBeenCalledWith('HomeTabs')
    })
    
    expect(googleButton).toBeTruthy()

  })

  //on log in press, login failed alert is called
  it('on log in press, login failed alert is called',async () => {
    (login.loginEmailPassword as jest.Mock).mockResolvedValue(false)

    const { getByText, getByPlaceholderText } = render(
      <SafeAreaProvider>
        <NavigationContainer>
          <OnboardingScreen />
        </NavigationContainer>
      </SafeAreaProvider>
    )
    const loginButton = getByText('Log In')

    fireEvent.changeText(getByPlaceholderText("Username or email"), 'test@example.com')
    fireEvent.changeText(getByPlaceholderText("Password"), 'password123')

    await act(async () => {
      fireEvent.press(loginButton)
    })

    await waitFor(() => {
      expect(alert).toHaveBeenCalledWith('Login failed!')
    })

    expect(loginButton).toBeTruthy()

  })

  it('alerts "An error occurred during login." on login exception',async () => {
    (login.loginEmailPassword as jest.Mock).mockRejectedValue(new Error('Network error')) // Simulate an error


    const { getByText, getByPlaceholderText } = render(
      <SafeAreaProvider>
        <NavigationContainer>
          <OnboardingScreen />
        </NavigationContainer>
      </SafeAreaProvider>
    )
    const loginButton = getByText('Log In')

    fireEvent.changeText(getByPlaceholderText("Username or email"), 'test@example.com')
    fireEvent.changeText(getByPlaceholderText("Password"), 'password123')

    await act(async () => {
      fireEvent.press(loginButton)
    })

    await waitFor(() => {
      expect(alert).toHaveBeenCalledWith("An error occurred during login.")
    })

    expect(loginButton).toBeTruthy()

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
