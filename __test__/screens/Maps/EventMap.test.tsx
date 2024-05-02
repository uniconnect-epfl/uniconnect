import { fireEvent, render } from '@testing-library/react-native'
import Map from '../../../screens/Maps/EventMap' 
import React from 'react'

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native')
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
      goBack: jest.fn(),
    }),
    useRoute: () => ({
      params: {
        events: [
          {
            title: "Balelek 2023",
            location: "EPFL, Agora",
            point: { x: 46.51858962578904, y: 6.566048509782951},
            description: "Music festival 2023",
            date: new Date('2024-05-03'),
            imageUrl: "https://www.google.com"
          }
        ]
      }
    })
  }
})


  jest.mock('react-native-maps', () => {
    return {
      __esModule: true,
      default: jest.fn().mockImplementation(({ children, ...rest }) => <div {...rest}>{children}</div>), // Mocking MapView
      Marker: jest.fn().mockImplementation(({ children, ...rest }) => <div {...rest}>{children}</div>), // Mocking Marker
      Callout: jest.fn().mockImplementation(({ children, ...rest }) => <div {...rest}>{children}</div>), // Mocking Callout
      PROVIDER_GOOGLE: 'google',
    }
  })
  

describe('Map', () => {
    it('renders the map with markers for each event', () => {
        const {getByText} = render(
            <Map/>
            )

        const markers = getByText("5/3/2024")
        expect(markers).toBeTruthy()
        expect(getByText('Balelek 2023')).toBeTruthy() // Check for the title
        expect(getByText('EPFL, Agora')).toBeTruthy() // Check for the location
    })

    it('displays correct event details in callout', () => {

        const { getByText } = render(<Map />)
        const title = getByText('Balelek 2023')
        const location = getByText('EPFL, Agora')
        const date = getByText('5/3/2024')

        expect(title).toBeTruthy()
        expect(location).toBeTruthy()
        expect(date).toBeTruthy()
    })

    it('should handle callout press', () => {

        console.log = jest.fn()
        const { getByText } = render(<Map />)
        const calloutText = getByText('Balelek 2023')
        fireEvent.press(calloutText)
        expect(console.log).toHaveBeenCalledWith("Callout pressed:", "Balelek 2023")
    })


  it('should navigate back when the back button is pressed', () => {
    const { getByTestId } = render(<Map />)
    const backButton = getByTestId('back-button') 
    fireEvent.press(backButton)
  })
   
})


