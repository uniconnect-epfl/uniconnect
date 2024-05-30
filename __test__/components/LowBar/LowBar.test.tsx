import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import LowBar from '../../../components/LowBar/LowBar'
import { RegistrationContext } from '../../../contexts/RegistrationContext'

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

      const mockSetSelectedInterests = jest.fn()
      const mockSelectedInterests = ["one"]
  
      const providerProps = {
        selectedInterests: ["one"],
        setSelectedInterests: mockSetSelectedInterests,
        description: mockSelectedInterests,
        setDescription: jest.fn(),
        firstName: "first name",
        setFirstName: jest.fn(),
        lastName: "last name",
        setLastName: jest.fn(),
        date: new Date(),
        setDate: jest.fn(),
        location: "",
        setLocation: jest.fn(),
        fromGoogle: false
      }
      const { getByText } = render(
          <RegistrationContext.Provider value={providerProps}>
            <LowBar />
          </RegistrationContext.Provider>
      )
      const nextButton = getByText('Next')
      fireEvent.press(nextButton)
      expect(mockNavigate).toHaveBeenCalledTimes(1)
    })

    it('goes back on pressing Back', () => {
      const mockSetSelectedInterests = jest.fn()
      const mockSelectedInterests = ["one"]
  
      const providerProps = {
        selectedInterests: ["one"],
        setSelectedInterests: mockSetSelectedInterests,
        description: mockSelectedInterests,
        setDescription: jest.fn(),
        firstName: "first name",
        setFirstName: jest.fn(),
        lastName: "last name",
        setLastName: jest.fn(),
        date: new Date(),
        setDate: jest.fn(),
        location: "",
        setLocation: jest.fn(),
        fromGoogle: false
      }
      const { getByText } = render(
        <RegistrationContext.Provider value={providerProps}>
          <LowBar />
        </RegistrationContext.Provider>
      )
      const backButton = getByText('Back')
      fireEvent.press(backButton)
      expect(mockGoBack).toHaveBeenCalledTimes(1)
    })

    it("authenticates user after google sign in", () => {
      const mockSetSelectedInterests = jest.fn()
      const mockSelectedInterests = ["one"]
  
      const providerProps = {
        user: { email: "email", uid: "uid" },
        selectedInterests: ["one"],
        setSelectedInterests: mockSetSelectedInterests,
        description: mockSelectedInterests,
        setDescription: jest.fn(),
        firstName: "first name",
        setFirstName: jest.fn(),
        lastName: "last name",
        setLastName: jest.fn(),
        date: new Date(),
        setDate: jest.fn(),
        location: "",
        setLocation: jest.fn(),
        fromGoogle: true,
        setFromGoogle: jest.fn()
      }
        const { getByText } = render(
          <RegistrationContext.Provider value={providerProps}>
            <LowBar nextScreen="ExploreTabs" />
          </RegistrationContext.Provider>
        )
        const nextButton = getByText('Next')
        fireEvent.press(nextButton)
        expect(mockNavigate).toHaveBeenCalledTimes(1)
    })

    it("authenticates after simple sign in", () => {
      const mockSetSelectedInterests = jest.fn()
      const mockSelectedInterests = ["one"]
  
      const providerProps = {
        user: null,
        selectedInterests: ["one"],
        setSelectedInterests: mockSetSelectedInterests,
        description: mockSelectedInterests,
        setDescription: jest.fn(),
        firstName: "first name",
        setFirstName: jest.fn(),
        lastName: "last name",
        setLastName: jest.fn(),
        date: new Date(),
        setDate: jest.fn(),
        location: "",
        setLocation: jest.fn(),
        fromGoogle: false
      }
      const { getByText } = render(
        <RegistrationContext.Provider value={providerProps}>
          <LowBar nextScreen="ExploreTabs" />
        </RegistrationContext.Provider>
      )
      const nextButton = getByText('Next')
      fireEvent.press(nextButton)
      expect(mockNavigate).toHaveBeenCalledTimes(1)
    })
})
