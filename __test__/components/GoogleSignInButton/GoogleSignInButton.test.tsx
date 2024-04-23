import { render, fireEvent } from '@testing-library/react-native'
import { GoogleSignInButton } from '../../../components/GoogleSignInButton/GoogleSignInButton'
import { Auth, UserCredential, signInWithCredential } from 'firebase/auth'
import * as Google from 'expo-auth-session/providers/google'

global.alert = jest.fn()

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
)

jest.mock('firebase/auth', () => ({
  getReactNativePersistence: jest.fn(() => ({} as Auth)),
  initializeAuth: jest.fn(() => ({} as Auth)),
  onAuthStateChanged: jest.fn(),
  GoogleAuthProvider: { credential: jest.fn() },
  signInWithCredential: jest.fn()
}))

jest.mock('expo-auth-session/providers/google', () => ({
  useAuthRequest: jest.fn()
}))

describe('GoogleSignInButton', () => {

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should sign in with Google when button is pressed and response is success', async () => {
    const mockUseAuthRequest = jest.fn(() => {
      return [
        null,
        { type: 'success', params: { id_token: 'mockIdToken' } },
        jest.fn()
      ]
    })
    const mockFunction = Google.useAuthRequest as jest.Mock
    mockFunction.mockImplementation(mockUseAuthRequest)

    const mockSignInWithCredential = jest.fn(() => Promise.resolve({} as UserCredential))
    const mockFunction2 = signInWithCredential as jest.Mock
    mockFunction2.mockImplementation(mockSignInWithCredential)

    const { getByTestId } = render(<GoogleSignInButton />)
    const button = getByTestId('google-sign-in-button')

    fireEvent.press(button)

    expect(signInWithCredential).toHaveBeenCalledTimes(1)
  })

  it('should throw an error upon invalid sign in', async () => {
    const mockUseAuthRequest = jest.fn(() => {
      return [
        null,
        { type: 'success', params: { id_token: 'mockIdToken' } },
        jest.fn()
      ]
    })
    const mockFunction = Google.useAuthRequest as jest.Mock
    mockFunction.mockImplementation(mockUseAuthRequest)

    const mockFunction2 = signInWithCredential as jest.Mock
    mockFunction2.mockRejectedValue(new Error('Network error')) 

    const { getByTestId } = render(<GoogleSignInButton />)
    const button = getByTestId('google-sign-in-button')

    fireEvent.press(button)

    expect(signInWithCredential).toHaveBeenCalledTimes(1)
    expect(getByTestId('google-sign-in-button')).toBeTruthy()
  })
})