import React from 'react'
import { fireEvent, render, waitFor } from '@testing-library/react-native'
import { UpdateMyProfileScreen } from '../../../../screens/Profile/UpdateMyProfile/UpdateMyProfileScreen'
import { Auth } from 'firebase/auth'
import { Firestore } from 'firebase/firestore'
import { NavigationContainer, NavigationProp, ParamListBase } from '@react-navigation/native'
import { launchImageLibraryAsync } from 'expo-image-picker'
  import { updateUserImage, uploadUserImageToStorage } from "../../../../firebase/User"

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(() => ({} as Auth)),
  createUserWithEmailAndPassword: jest.fn().mockImplementation((auth, email, password) => {
    if (email === "test@example.com" && password === "password") {
      return Promise.resolve(void 0)
    } else {
      return Promise.reject(new Error("Failed to create account"))
    }
  }),
  getReactNativePersistence: jest.fn(() => ({} as Auth)),
  initializeAuth: jest.fn(() => ({} as Auth)),
}))

const mockSetDoc = jest.fn()

jest.mock("firebase/firestore", () => ({
  getFirestore: jest.fn(() => ({} as Firestore)),
  getDoc: jest.fn(() => ({})),
  doc: jest.fn(() => ({})),
  addDoc: jest.fn(),
  collection: jest.fn(() => ({})),
  serverTimestamp: jest.fn(() => ({})),
  setDoc: mockSetDoc
}))

jest.mock("../../../../components/ToastMessage/toast", () => ({
  showErrorToast: jest.fn(),
  showSuccessToast: jest.fn()
}))

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
)

jest.mock('expo-image-picker', () => ({
  launchImageLibraryAsync: jest.fn(),
  MediaTypeOptions: { All: 'All' },
}))

jest.mock("../../../../firebase/User", () => ({
  updateUserImage: jest.fn(),
  uploadUserImageToStorage: jest.fn(),
}))

const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
  addListener: jest.fn(),
  removeListener: jest.fn(),
  reset: jest.fn(),
  setParams: jest.fn(),
  dispatch: jest.fn(),
  isFocused: jest.fn(),
  canGoBack: jest.fn(),
  dangerouslyGetParent: jest.fn(),
  dangerouslyGetState: jest.fn()
} as unknown as NavigationProp<ParamListBase>

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: mockNavigation,
    }),
    useRoute: () => ({
      params: {
        user: {
          firstName: "John",
          lastName: "Doe",
          location: "London",
          email: "",
          date: new Date(),
          description: "",
          selectedInterests: [],
          profilePicture: ""
        }
      }
    }),
  }
})

describe('UpdateMyProfileScreen', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  
  it('renders correctly', () => {
    const component = render(
    <NavigationContainer>
      <UpdateMyProfileScreen />
    </NavigationContainer>
    )
    expect(component).toBeTruthy()
  })

  it('should call uploadUserImageToStorage and updateUserImage when image is picked', async () => {
    const { getByText } = render(
      <NavigationContainer>
        <UpdateMyProfileScreen />
      </NavigationContainer>
    )
    const mockResult = {
      canceled: false,
      assets: [{ uri: 'image-uri' }],
    }

    const mockLaunchImageLibraryAsync = launchImageLibraryAsync as jest.Mock
    mockLaunchImageLibraryAsync.mockResolvedValue(mockResult)
    const mockUploadUserImageToStorage = uploadUserImageToStorage as jest.Mock
    mockUploadUserImageToStorage.mockResolvedValue('image-url')

    const updateButton = getByText("Update my profile picture")
    fireEvent.press(updateButton)
  })

  it('should not call uploadUserImageToStorage and updateUserImage when image picking is canceled', async () => {
    const { getByText } = render(
      <NavigationContainer>
        <UpdateMyProfileScreen />
      </NavigationContainer>
    )

    const mockResult = {
      canceled: true,
    }
    const mockLaunchImageLibraryAsync = launchImageLibraryAsync as jest.Mock
    mockLaunchImageLibraryAsync.mockResolvedValue(mockResult)
    const mockUploadUserImageToStorage = uploadUserImageToStorage as jest.Mock
    mockUploadUserImageToStorage.mockResolvedValue('image-url')

    await waitFor(() => {
      const updateButton = getByText("Update my profile picture")
      fireEvent.press(updateButton)
      expect(uploadUserImageToStorage).not.toHaveBeenCalled()
      expect(updateUserImage).not.toHaveBeenCalled()
    })
  })
})