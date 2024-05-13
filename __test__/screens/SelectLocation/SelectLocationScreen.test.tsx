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


describe('SelectLocationScreen', () => {
  
  it('renders correctly', () => {
    const component = render(
        <NavigationContainer>
            <SelectLocationScreen />
        </NavigationContainer>
    )
    expect(component).toBeTruthy()
  })

  it('renders correctly', () => {
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