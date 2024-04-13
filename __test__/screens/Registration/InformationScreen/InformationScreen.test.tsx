import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import InformationScreen from '../../../../screens/Registration/InformationScreen/InformationScreen'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native'

jest.mock('react-native-safe-area-context', () => {
  const inset = {top: 0, right: 0, bottom: 0, left: 0}
  return {
    SafeAreaProvider: jest.fn(({children}) => children),
    SafeAreaConsumer: jest.fn(({children}) => children(inset)),
    useSafeAreaInsets: jest.fn(() => inset),
    useSafeAreaFrame: jest.fn(() => ({x: 0, y: 0, width: 390, height: 844})),
  }
})

describe('InformationScreen', () => {
    it('renders the screen with necessary components', () => {
        const { getByPlaceholderText, getByText } = render(
          <SafeAreaProvider>
            <NavigationContainer>
              <InformationScreen/>
            </NavigationContainer>
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
            <NavigationContainer>
              <InformationScreen/>
            </NavigationContainer>
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
