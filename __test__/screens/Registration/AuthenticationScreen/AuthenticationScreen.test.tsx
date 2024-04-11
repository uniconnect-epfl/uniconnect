import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import AuthenticationScreen from '../../../../screens/Registration/AuthenticationScreen/AuthenticationScreen'
import { SafeAreaProvider } from 'react-native-safe-area-context'

describe('AuthenticationScreen', () => {
    it('renders the screen', () => {
        const { getByText, getByPlaceholderText } = render(
          <SafeAreaProvider>
            <AuthenticationScreen />
          </SafeAreaProvider>
        )
        expect(getByText('Last Step')).toBeTruthy()
        expect(getByPlaceholderText('****************')).toBeTruthy()
        expect(getByPlaceholderText('E-mail')).toBeTruthy()
    })

    it('allows entering passwords and emails', () => {
        const { getByPlaceholderText } = render(
          <SafeAreaProvider>
            <AuthenticationScreen />
          </SafeAreaProvider>
        )
        const passwordInput = getByPlaceholderText('****************')
        fireEvent.changeText(passwordInput, 'password123')
        expect(passwordInput.props.value).toBe('password123')

        const emailInput = getByPlaceholderText('E-mail')
        fireEvent.changeText(emailInput, 'test@example.com')
        expect(emailInput.props.value).toBe('test@example.com')
    })

    it('validates password and email correctness', () => {
        const { getByLabelText, getByText } = render(
          <SafeAreaProvider>
            <AuthenticationScreen />
          </SafeAreaProvider>
        )
        
        fireEvent.changeText(getByLabelText('Password*'), 'password123')
        fireEvent.changeText(getByLabelText('Confirm Password*'), 'password123')
        fireEvent.changeText(getByLabelText('E-mail*'), 'test@example.com')
        fireEvent.changeText(getByLabelText('Confirm e-mail*'), 'test@example.com')

        expect(getByText('Passwords matching')).toBeTruthy()
        expect(getByText('Emails matching')).toBeTruthy()
    })

    it('submits the form when data is correct', () => {
        const { getByText, getByLabelText } = render(
          <SafeAreaProvider>
            <AuthenticationScreen />
          </SafeAreaProvider>
        )
        fireEvent.changeText(getByLabelText('Password*'), 'password123')
        fireEvent.changeText(getByLabelText('Confirm Password*'), 'password123')
        fireEvent.changeText(getByLabelText('E-mail*'), 'test@example.com')
        fireEvent.changeText(getByLabelText('Confirm e-mail*'), 'test@example.com')

        const submitButton = getByText('Send confirmation e-mail')
        fireEvent.press(submitButton);
  
    })
})
