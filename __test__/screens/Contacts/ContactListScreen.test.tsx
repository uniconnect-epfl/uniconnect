import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import { ContactListScreen } from '../../../screens/Contacts/ContactListScreen'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { black, lightGray } from '../../../assets/colors/colors'
import { NavigationContainer } from '@react-navigation/native'

const mockNavigate = jest.fn()

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: mockNavigate,
    }),
  }
})

jest.mock('react-native-safe-area-context', () => {
  const inset = {top: 0, right: 0, bottom: 0, left: 0}
  return {
    SafeAreaProvider: jest.fn(({children}) => children),
    SafeAreaConsumer: jest.fn(({children}) => children(inset)),
    useSafeAreaInsets: jest.fn(() => inset),
    useSafeAreaFrame: jest.fn(() => ({x: 0, y: 0, width: 390, height: 844})),
  }
})

describe('ContactListScreen', () => {

    it('renders the screen', () => {
        const component = render(
        <SafeAreaProvider>
          <NavigationContainer>
            <ContactListScreen />
          </NavigationContainer>
        </SafeAreaProvider>
        )
        expect(component).toBeTruthy()
    })

    it('filters contacts based on search input', () => {
        const { getByText, getByPlaceholderText, queryByText } = render(
          <SafeAreaProvider>
            <NavigationContainer>
              <ContactListScreen />
            </NavigationContainer>
          </SafeAreaProvider>
          )

        fireEvent.changeText(getByPlaceholderText('Search...'), 'Jocovi')
        expect(getByText('Jocović')).toBeTruthy()
        expect(queryByText('Hervé')).toBeNull()
        expect(queryByText('')).toBeNull()
        expect(queryByText('Abc')).toBeNull()

        fireEvent.changeText(getByPlaceholderText('Search...'), '')
        expect(getByText('Hervé')).toBeTruthy()
    })
    
    it('displays correct contact details', () => {
        const { getByText } = render(
          <SafeAreaProvider>
            <NavigationContainer>
              <ContactListScreen />
            </NavigationContainer>
          </SafeAreaProvider>
          )
        expect(getByText('Jocović')).toBeTruthy()
        expect(getByText('This guy is very weird')).toBeTruthy()
    })
    
    it('updates tab selection on button press', () => {
        const { getByText } = render(
          <SafeAreaProvider>
            <NavigationContainer>
              <ContactListScreen />
            </NavigationContainer>
          </SafeAreaProvider>
          )

        fireEvent.press(getByText('Graph View'))
        expect(getByText('Graph View').props.style[1].color).toBe(black)
        expect(getByText('Plain View').props.style[1].color).toBe(lightGray)
        fireEvent.press(getByText('Plain View'))
        expect(getByText('Graph View').props.style[1].color).toBe(lightGray)
        expect(getByText('Plain View').props.style[1].color).toBe(black)
    })

    it('navigates to profile screen when clicking on contact', () => {
      const { getByText } = render(
        <SafeAreaProvider>
          <NavigationContainer>
            <ContactListScreen />
          </NavigationContainer>
        </SafeAreaProvider>
      )
      const signUpButton = getByText('Jocović')
      fireEvent.press(signUpButton)
      expect(mockNavigate).toHaveBeenCalledWith({"name": "ExternalProfile", "params": {"uid": "1"}})
    })

})


