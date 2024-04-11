import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import InputField from '../../../components/InputField/InputField'

describe('InputField', () => {
    it('renders with correct label and placeholder', () => {
        const { getByText, getByPlaceholderText } = render(
            <InputField 
                label="Email" 
                placeholder="Enter your email"
            />
        )

        expect(getByText('Email')).toBeTruthy()
        expect(getByPlaceholderText('Enter your email')).toBeTruthy()
    })

    it('allows text to be entered in the TextInput', () => {
        let testValue = '';
        const handleChangeText = (text: string) => {
            testValue = text;
        }

        const { getByPlaceholderText } = render(
            <InputField 
                label="Password" 
                placeholder="Enter your password" 
                onChangeText={handleChangeText}
            />
        )

        const input = getByPlaceholderText('Enter your password')
        fireEvent.changeText(input, 'mypassword')

        expect(testValue).toBe('mypassword')
    })

    it('displays the passed value in TextInput', () => {
        const { getByDisplayValue } = render(
            <InputField 
                label="Username" 
                placeholder="Enter your username" 
                value="JohnDoe"
            />
        )

        expect(getByDisplayValue('JohnDoe')).toBeTruthy()
    })
})
