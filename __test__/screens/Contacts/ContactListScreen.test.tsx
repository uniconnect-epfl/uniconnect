import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import { ContactListScreen } from '../../../screens/Contacts/ExploreScreen'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { black, lightGray } from '../../../assets/colors/colors'
import { NavigationContainer, NavigationProp, ParamListBase } from '@react-navigation/native'

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

beforeAll(() => {
  global.alert = jest.fn()
})

describe('ContactListScreen', () => {

    it('renders the screen', () => {
        const component = render(
        <SafeAreaProvider>
          <NavigationContainer>
            <ContactListScreen navigation={mockNavigation}/>
          </NavigationContainer>
        </SafeAreaProvider>
        )
        expect(component).toBeTruthy()
    })

    it('filters contacts based on search input', () => {
        const { getByText, getByPlaceholderText, queryByText } = render(
          <SafeAreaProvider>
            <NavigationContainer>
              <ContactListScreen navigation={mockNavigation}/>
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
              <ContactListScreen navigation={mockNavigation}/>
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
              <ContactListScreen navigation={mockNavigation}/>
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
            <ContactListScreen navigation={mockNavigation}/>
          </NavigationContainer>
        </SafeAreaProvider>
      )
      const signUpButton = getByText('Jocović')
      fireEvent.press(signUpButton)
      expect(mockNavigation.navigate).toHaveBeenCalledWith("ExternalProfile", {"uid": "1"})
    })

})


