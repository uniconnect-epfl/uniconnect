import React from 'react'
import { fireEvent, render } from '@testing-library/react-native'
import { SelectLocationScreen } from '../../../screens/SelectLocation/SelectLocationScreen'
import { NavigationContainer } from '@react-navigation/native'

const mockGoBack = jest.fn()
const mockNavigate = jest.fn()

jest.mock("@react-navigation/native", () => {
    return {
      ...jest.requireActual("@react-navigation/native"),
      useRoute: () => ({
        params: {
          initialLocation: {x: 0, y: 0},
          onLocationChange: jest.fn()
        },
      }),
      useNavigation: () => ({
        navigate: mockNavigate,
        goBack: mockGoBack,
      }),
    }
})

//mock an alert with jest
global.alert = jest.fn()

jest.mock('react-native-maps', () => {
    return {
      __esModule: true,
      default: jest.fn().mockImplementation(({ children, ...rest }) => <div {...rest}>{children}</div>), // Mocking MapView
      Marker: jest.fn().mockImplementation(({ children, ...rest }) => <div {...rest}>{children}</div>), // Mocking Marker
      Callout: jest.fn().mockImplementation(({ children, ...rest }) => <div {...rest}>{children}</div>), // Mocking Callout
      PROVIDER_GOOGLE: 'google',
    }
  })


describe('SelectLocationScreen', () => {
  it('renders correctly', () => {
    const component = render(
        <NavigationContainer>
            <SelectLocationScreen />
        </NavigationContainer>
    )
    expect(component).toBeTruthy()
  })

  it('renders correctly with no initial point', () => {
    jest.mock("@react-navigation/native", () => {
        const actualNav = jest.requireActual("@react-navigation/native")
        return {
          ...actualNav,
          useRoute: () => ({
            params: {
              initialLocation: undefined,
              onLocationChange: jest.fn()
            },
          }),
          useNavigation: () => ({
            navigate: jest.fn(),
            goBack: jest.fn(),
          }),
        }
      })
    const component = render(
        <NavigationContainer>
            <SelectLocationScreen />
        </NavigationContainer>
    )
    expect(component).toBeTruthy()
  })

  it('we can confirmate', () => {
    const { getByText } = render(
        <NavigationContainer>
            <SelectLocationScreen />
        </NavigationContainer>
    )
    const confirmButton = getByText("Confirm")
    fireEvent.press(confirmButton)
    expect(mockGoBack).toHaveBeenCalled
  })

})