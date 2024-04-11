import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import InterestsScreen from '../../../../screens/Registration/InterestsScreen/InterestsScreen'
import { SafeAreaProvider } from 'react-native-safe-area-context'

describe('InterestsScreen', () => {
    it('renders the screen with necessary components', () => {
        const { getByPlaceholderText, getAllByText } = render(
          <SafeAreaProvider>
            <InterestsScreen />
          </SafeAreaProvider>
        )

        expect(getByPlaceholderText('Search')).toBeTruthy()

        const interestButtons = getAllByText(/.+/)
        expect(interestButtons.length).toBeGreaterThan(0)
    })

    it('allows searching and filters interests', () => {
        const { getByPlaceholderText, queryByText } = render(
          <SafeAreaProvider>
            <InterestsScreen />
          </SafeAreaProvider>
        )

        const searchInput = getByPlaceholderText('Search')
        fireEvent.changeText(searchInput, 'Machine Learning')
        
        expect(queryByText('Machine Learning')).toBeTruthy()
        expect(queryByText('Artificial Intelligence')).toBeNull()
    })

    it('allows selecting and deselecting interests', () => {
        const { getByText } = render(
          <SafeAreaProvider>
            <InterestsScreen />
          </SafeAreaProvider>
        )

        const interestButton = getByText('Machine Learning') 
        fireEvent.press(interestButton) 
        fireEvent.press(interestButton) 

    })
})
