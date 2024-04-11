import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import InformationScreen from '../../../../screens/Registration/InformationScreen/InformationScreen'
import { SafeAreaProvider } from 'react-native-safe-area-context'

describe('InformationScreen', () => {
    it('renders the screen with necessary components', () => {
        const { getByPlaceholderText, getByText } = render(
          <SafeAreaProvider>
            <InformationScreen />
          </SafeAreaProvider>
      )

        expect(getByPlaceholderText("First name")).toBeTruthy()
        expect(getByPlaceholderText("Last name")).toBeTruthy()
        expect(getByPlaceholderText("Date of birth")).toBeTruthy()
        expect(getByPlaceholderText("Location")).toBeTruthy()

        expect(getByText('Use my location?')).toBeTruthy()
        expect(getByText('Add a description now')).toBeTruthy()
    })

    it('toggles text input visibility', () => {
        const { getByText, queryByPlaceholderText } = render(
          <SafeAreaProvider>
            <InformationScreen />
          </SafeAreaProvider>
        )
        
        const toggleButton = getByText("Add a description now")
        fireEvent.press(toggleButton)
        
        const textInput = queryByPlaceholderText("Describe yourself here!")
        expect(textInput).toBeTruthy()

        fireEvent.press(toggleButton)
        
        expect(queryByPlaceholderText("Describe yourself here!")).toBeNull()
    })

})
