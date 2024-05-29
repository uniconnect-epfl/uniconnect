import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import LowBar from '../../../components/LowBar/LowBar'

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useContext: jest.fn(() => ({
  user: {},
  firstName: 'firstName',
  lastName: 'lastName',
  location: 'location',
  date: 'date',
  description: 'description',
  selectedInterests: ["1", "2"],
  fromGoogle: false})),
}))

jest.mock("../../../firebase/Registration", () => ({
  storeInitialUserData: jest.fn()
}))

const mockNavigate = jest.fn()
const mockGoBack = jest.fn()

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: mockNavigate,
      goBack: mockGoBack,
    }),
  }
})

describe('LowBar', () => {

    it('navigates to next screen on pressing Next', () => {
        const { getByText } = render(
            <LowBar />
        )
        const nextButton = getByText('Next')
        fireEvent.press(nextButton)
        expect(mockNavigate).toHaveBeenCalledTimes(1)
    })

    it('goes back on pressing Back', () => {
        const { getByText } = render(
            <LowBar />
        )
        const backButton = getByText('Back')
        fireEvent.press(backButton)
        expect(mockGoBack).toHaveBeenCalledTimes(1)
    })
})
