import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import LowBar from '../../../components/LowBar/LowBar'
import { NavigationContext, NavigationProp, ParamListBase } from '@react-navigation/native'

describe('LowBar', () => {
    const mockNavigate = jest.fn()
    const mockGoBack = jest.fn()

    const mockNavigation: Partial<NavigationProp<ParamListBase>> = {
      navigate: mockNavigate as never,
      goBack: mockGoBack as never,
    }

    const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
      <NavigationContext.Provider value={mockNavigation as NavigationProp<ParamListBase>}>
          {children}
      </NavigationContext.Provider>
    )

    it('navigates to next screen on pressing Next', () => {
        const { getByText } = render(<LowBar />, { wrapper })
        const nextButton = getByText('Next')
        fireEvent.press(nextButton)
        expect(mockNavigate).toHaveBeenCalledWith("Interests")
    })

    it('goes back on pressing Back', () => {
        const { getByText } = render(<LowBar />, { wrapper })
        const backButton = getByText('Back')
        fireEvent.press(backButton)
        expect(mockGoBack).toHaveBeenCalledTimes(1)
    })
})
