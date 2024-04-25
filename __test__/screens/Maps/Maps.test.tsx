import { fireEvent, render } from '@testing-library/react-native'
import Map from '../../../screens/Maps/Maps' 
import React from 'react'

jest.mock('@react-navigation/native', () => {
    return {
      ...jest.requireActual('@react-navigation/native'),
      useRoute: () => ({
        params: {
          events: [
            { title: "Balelek 2023", location: "EPFL, Agora", latitude: 46.51858962578904, longitude: 6.566048509782951, date: "2023-04-04" },
            { title: "Event 2", location: "EPFL, CM", latitude: 46.51858962578904, longitude: 6.566048509782951, date: "2022-08-04" }
          ]
        }
      })
    }
  })


  jest.mock('react-native-maps', () => {
    const mockMapView = jest.fn(({ children }) => children)
    const mockMarker = jest.fn(({ children }) => children)
    const mockCallout = jest.fn(({ children }) => children)
    return {
      __esModule: true,
      default: mockMapView,
      Marker: mockMarker,
      Callout: mockCallout,
      PROVIDER_GOOGLE: 'google',
    }
  })
  

describe('Map', () => {
    it('renders the map with markers for each event', () => {
        const {getByText} = render(
            <Map/>
            )

        const markers = getByText("2023-04-04")
        expect(markers).toBeTruthy()
    })

    it('displays correct event details in callout', () => {

        const { getByText } = render(<Map />)
        const title = getByText('Balelek 2023')
        const location = getByText('EPFL, Agora')
        const date = getByText('2023-04-04')

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
   
})


