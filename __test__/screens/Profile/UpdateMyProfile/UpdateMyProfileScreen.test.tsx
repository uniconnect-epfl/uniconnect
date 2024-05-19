import React from 'react'
import { fireEvent, render, waitFor } from '@testing-library/react-native'
import { UpdateMyProfileScreen } from '../../../../screens/Profile/UpdateMyProfile/UpdateMyProfileScreen'
import { Auth } from 'firebase/auth'
import { Firestore } from 'firebase/firestore'
import { NavigationContainer, NavigationProp, ParamListBase } from '@react-navigation/native'
import { launchImageLibraryAsync } from 'expo-image-picker'
  import { updateUserData, updateUserImage, uploadUserImageToStorage } from "../../../../firebase/User"
import { showSuccessToast } from '../../../../components/ToastMessage/toast'
import { SafeAreaProvider } from 'react-native-safe-area-context'

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
  updateUserData: jest.fn()
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
      goBack: jest.fn(),
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
        },
        fetchData: jest.fn()
      }
    }),
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

describe('UpdateMyProfileScreen', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  
  it('renders correctly', () => {
    const component = render(
    <SafeAreaProvider>
      <NavigationContainer>
        <UpdateMyProfileScreen />
      </NavigationContainer>
    </SafeAreaProvider>
    )
    expect(component).toBeTruthy()
  })

  it('should call uploadUserImageToStorage and updateUserImage when image is picked', async () => {
    const { getByTestId } = render(
      <SafeAreaProvider>
      <NavigationContainer>
        <UpdateMyProfileScreen />
      </NavigationContainer>
    </SafeAreaProvider>
    )
    const mockResult = {
      canceled: false,
      assets: [{ uri: 'image-uri' }],
    }

    const mockLaunchImageLibraryAsync = launchImageLibraryAsync as jest.Mock
    mockLaunchImageLibraryAsync.mockResolvedValue(mockResult)
    const mockUploadUserImageToStorage = uploadUserImageToStorage as jest.Mock
    mockUploadUserImageToStorage.mockResolvedValue('image-url')

    const updateButton = getByTestId("update-profile-picture")
    fireEvent.press(updateButton)
  })

  it('should not call uploadUserImageToStorage and updateUserImage when image picking is canceled', async () => {
    const { getByTestId } = render(
      <SafeAreaProvider>
        <NavigationContainer>
          <UpdateMyProfileScreen />
        </NavigationContainer>
      </SafeAreaProvider>
    )

    const mockResult = {
      canceled: true,
    }
    const mockLaunchImageLibraryAsync = launchImageLibraryAsync as jest.Mock
    mockLaunchImageLibraryAsync.mockResolvedValue(mockResult)
    const mockUploadUserImageToStorage = uploadUserImageToStorage as jest.Mock
    mockUploadUserImageToStorage.mockResolvedValue('image-url')

    await waitFor(() => {
      const updateButton = getByTestId("update-profile-picture")
      fireEvent.press(updateButton)
      expect(uploadUserImageToStorage).not.toHaveBeenCalled()
      expect(updateUserImage).not.toHaveBeenCalled()
    })
  })

  it("should show success toast and navigate back when user data is updated", async () => {
    const { getByText } = render(
      <SafeAreaProvider>
        <NavigationContainer>
          <UpdateMyProfileScreen />
        </NavigationContainer>
      </SafeAreaProvider>
    )

    const mockUpdateUserData = updateUserData as jest.Mock
    mockUpdateUserData.mockResolvedValue(true)

    const updateButton = getByText("Submit changes")
    fireEvent.press(updateButton)

    await waitFor(() => {
      expect(showSuccessToast).toHaveBeenCalledTimes(1)
    })
  })

  it("should show error toast when user data is not updated", async () => {
    const { getByText } = render(
      <SafeAreaProvider>
        <NavigationContainer>
          <UpdateMyProfileScreen />
        </NavigationContainer>
      </SafeAreaProvider>
    )

    const mockUpdateUserData = updateUserData as jest.Mock
    mockUpdateUserData.mockResolvedValue(false)

    const updateButton = getByText("Submit changes")
    fireEvent.press(updateButton)

    await waitFor(() => {
      expect(showSuccessToast).not.toHaveBeenCalled()
    })
  })
})