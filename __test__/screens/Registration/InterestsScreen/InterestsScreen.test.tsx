import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import InterestsScreen from '../../../../screens/Registration/InterestsScreen/InterestsScreen'
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

describe('InterestsScreen', () => {
    it('renders the screen with necessary components', () => {
        const { getByPlaceholderText, getAllByText } = render(
          <SafeAreaProvider>
            <NavigationContainer>
              <InterestsScreen />
            </NavigationContainer>
          </SafeAreaProvider>
        )

        expect(getByPlaceholderText('Search')).toBeTruthy()

        const interestButtons = getAllByText(/.+/)
        expect(interestButtons.length).toBeGreaterThan(0)
    })

    it('allows searching and filters interests', () => {
        const { getByPlaceholderText, getByText } = render(
          <SafeAreaProvider>
            <NavigationContainer>
              <InterestsScreen />
            </NavigationContainer>
          </SafeAreaProvider>
        )

        const searchInput = getByPlaceholderText('Search')
        fireEvent.changeText(searchInput, 'Machine Learning')
        
        expect(getByText('Machine Learning')).toBeTruthy()
    })

    it('allows selecting and deselecting interests', () => {
        const { getByText } = render(
          <SafeAreaProvider>
            <NavigationContainer>
              <InterestsScreen />
            </NavigationContainer>
          </SafeAreaProvider>
        )

        const interestButton = getByText('Machine Learning') 
        fireEvent.press(interestButton) 
        fireEvent.press(interestButton) 

    })
})
