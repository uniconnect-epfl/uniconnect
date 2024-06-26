import React from 'react'
import { render, fireEvent, act, waitFor } from '@testing-library/react-native'
import AuthenticationScreen from '../../../../screens/Registration/AuthenticationScreen/AuthenticationScreen'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native'
import * as registration from '../../../../firebase/Registration'
import { showErrorToast } from '../../../../components/ToastMessage/toast'


jest.mock('react-native-safe-area-context', () => {
  const inset = { top: 0, right: 0, bottom: 0, left: 0 }
  return {
    SafeAreaProvider: jest.fn(({ children }) => children),
    SafeAreaConsumer: jest.fn(({ children }) => children(inset)),
    useSafeAreaInsets: jest.fn(() => inset),
    useSafeAreaFrame: jest.fn(() => ({ x: 0, y: 0, width: 390, height: 844 })),
  }
})

// Mocking modules
jest.mock('../../../../firebase/Registration', () => ({
  createAccount: jest.fn(),
  storeEmail: jest.fn()
}))


jest.mock("../../../../components/ToastMessage/toast", () => ({
  showErrorToast: jest.fn(),
  showSuccessToast: jest.fn()
}))



describe('AuthenticationScreen', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    (registration.createAccount as jest.Mock).mockResolvedValue(void 0)

  })

  it('renders the screen', () => {
    const { getByText } = render(
      <SafeAreaProvider>
        <NavigationContainer>
          <AuthenticationScreen />
        </NavigationContainer>
      </SafeAreaProvider>
    )
    expect(getByText('Last Step')).toBeTruthy()
    expect(getByText("E-mail*")).toBeTruthy()
    expect(getByText("Confirm e-mail*")).toBeTruthy()
  })

  it('allows entering passwords and emails', () => {
    const { getByPlaceholderText, getAllByPlaceholderText } = render(
      <SafeAreaProvider>
        <NavigationContainer>
          <AuthenticationScreen />
        </NavigationContainer>
      </SafeAreaProvider>
    )
    const passwordInput = getAllByPlaceholderText("****************")[0]
    fireEvent.changeText(passwordInput, 'password123')
    expect(passwordInput.props.value).toBe('password123')

    const emailInput = getByPlaceholderText('E-mail')
    fireEvent.changeText(emailInput, 'test@example.com')
    expect(emailInput.props.value).toBe('test@example.com')
  })

  it('validates password correctness', () => {
    const { getAllByPlaceholderText, getByPlaceholderText, getByText } = render(
      <SafeAreaProvider>
        <NavigationContainer>
          <AuthenticationScreen />
        </NavigationContainer>
      </SafeAreaProvider>
    )

    fireEvent.changeText(getAllByPlaceholderText("****************")[0], 'password123')
    fireEvent.changeText(getAllByPlaceholderText("****************")[1], 'password123')
    fireEvent.changeText(getByPlaceholderText("E-mail"), 'test@example.com')
    fireEvent.changeText(getByPlaceholderText("Confirm your e-mail"), 'test@example.com')

    expect(getByText('Passwords matching')).toBeTruthy()
  })

  it('submits the form when data is correct', async () => {
    const { getByText, getByPlaceholderText, getAllByPlaceholderText } = render(
      <SafeAreaProvider>
        <NavigationContainer>
          <AuthenticationScreen />
        </NavigationContainer>
      </SafeAreaProvider>
    )

    fireEvent.changeText(getAllByPlaceholderText("****************")[0], 'password123')
    fireEvent.changeText(getAllByPlaceholderText("****************")[1], 'password123')
    fireEvent.changeText(getByPlaceholderText("E-mail"), 'test@example.com')
    fireEvent.changeText(getByPlaceholderText("Confirm your e-mail"), 'test@example.com')

    const submitButton = getByText('Confirm')
    await  act(async () => {  
    fireEvent.press(submitButton)
    }) 

    await waitFor(() => {
      expect(registration.createAccount).toHaveBeenCalled()
    })

  })

  it('shows alert when data is incorrect', async () => {
    // Set up component with invalid data conditions
    const { getByText, getByPlaceholderText, getAllByPlaceholderText } = render(
      <SafeAreaProvider>
        <NavigationContainer>
          <AuthenticationScreen />
        </NavigationContainer>
      </SafeAreaProvider>
    )

    fireEvent.changeText(getAllByPlaceholderText("****************")[0], 'password123')
    fireEvent.changeText(getAllByPlaceholderText("****************")[1], 'password124')
    fireEvent.changeText(getByPlaceholderText("E-mail"), 'test@example.com')
    fireEvent.changeText(getByPlaceholderText("Confirm your e-mail"), 'test@example.com')

    const submitButton = getByText('Confirm')

    // Assuming the function to check data validity returns false
    // You might need to mock these if they are not part of the component's direct logic

    await  act(async () => {  
      fireEvent.press(submitButton)
      }) 
    await waitFor(() => {
      expect(showErrorToast).toHaveBeenCalledWith("Passwords do not match")
    })
  })

  it('shows alert when password is too short', async () => {
    const { getByText, getByPlaceholderText, getAllByPlaceholderText } = render(
      <SafeAreaProvider>
        <NavigationContainer>
          <AuthenticationScreen />
        </NavigationContainer>
      </SafeAreaProvider>
    )

    fireEvent.changeText(getAllByPlaceholderText("****************")[0], 'pass')
    fireEvent.changeText(getAllByPlaceholderText("****************")[1], 'pass')
    fireEvent.changeText(getByPlaceholderText("E-mail"), 'test@example.com')
    fireEvent.changeText(getByPlaceholderText("Confirm your e-mail"), 'test@example.com')

    const submitButton = getByText('Confirm')

    await act(async () => {
      fireEvent.press(submitButton)
    })

    await waitFor(() => {
      expect(showErrorToast).toHaveBeenCalledWith("Password must be at least 8 characters long")
    })
  })

  it('shows alert when passwords do not match', async () => {
    const { getByText, getByPlaceholderText, getAllByPlaceholderText } = render(
      <SafeAreaProvider>
        <NavigationContainer>
          <AuthenticationScreen />
        </NavigationContainer>
      </SafeAreaProvider>
    )

    fireEvent.changeText(getAllByPlaceholderText("****************")[0], 'password123')
    fireEvent.changeText(getAllByPlaceholderText("****************")[1], 'password456')
    fireEvent.changeText(getByPlaceholderText("E-mail"), 'test@example.com')
    fireEvent.changeText(getByPlaceholderText("Confirm your e-mail"), 'test@example.com')

    const submitButton = getByText('Confirm')

    await act(async () => {
      fireEvent.press(submitButton)
    })

    await waitFor(() => {
      expect(showErrorToast).toHaveBeenCalledWith("Passwords do not match")
    })
  })

  it('shows alert when email is invalid', async () => {
    const { getByText, getByPlaceholderText, getAllByPlaceholderText } = render(
      <SafeAreaProvider>
        <NavigationContainer>
          <AuthenticationScreen />
        </NavigationContainer>
      </SafeAreaProvider>
    )

    fireEvent.changeText(getAllByPlaceholderText("****************")[0], 'password123')
    fireEvent.changeText(getAllByPlaceholderText("****************")[1], 'password123')
    fireEvent.changeText(getByPlaceholderText("E-mail"), 'invalidemail')
    fireEvent.changeText(getByPlaceholderText("Confirm your e-mail"), 'invalidemail')

    const submitButton = getByText('Confirm')

    await act(async () => {
      fireEvent.press(submitButton)
    })

    await waitFor(() => {
      expect(showErrorToast).toHaveBeenCalledWith("Please enter a valid email address")
    })
  })

  it('shows alert when emails do not match', async () => {
    const { getByText, getByPlaceholderText, getAllByPlaceholderText } = render(
      <SafeAreaProvider>
        <NavigationContainer>
          <AuthenticationScreen />
        </NavigationContainer>
      </SafeAreaProvider>
    )

    fireEvent.changeText(getAllByPlaceholderText("****************")[0], 'password123')
    fireEvent.changeText(getAllByPlaceholderText("****************")[1], 'password123')
    fireEvent.changeText(getByPlaceholderText("E-mail"), 'test@example.com')
    fireEvent.changeText(getByPlaceholderText("Confirm your e-mail"), 'test@example.net')

    const submitButton = getByText('Confirm')

    await act(async () => {
      fireEvent.press(submitButton)
    })

    await waitFor(() => {
      expect(showErrorToast).toHaveBeenCalledWith("Emails do not match")
    })
  })

  it('dismisses the keyboard', async () => {
    const { getByText } = render(
      <SafeAreaProvider>
        <NavigationContainer>
          <AuthenticationScreen />
        </NavigationContainer>
      </SafeAreaProvider>
    )
    fireEvent.press(getByText("Last Step"))
  })

})
