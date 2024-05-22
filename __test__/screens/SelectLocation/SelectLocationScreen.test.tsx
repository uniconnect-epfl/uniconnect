import React from 'react'
import { fireEvent, render, waitFor } from '@testing-library/react-native'
import { SelectLocationScreen } from '../../../screens/SelectLocation/SelectLocationScreen'
import { NavigationContainer } from '@react-navigation/native'
import fetchMock from 'jest-fetch-mock'
import { showErrorToast } from '../../../components/ToastMessage/toast'

const mockGoBack = jest.fn()
const mockNavigate = jest.fn()

jest.mock('../../../components/ToastMessage/toast')

fetchMock.enableMocks()

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
  beforeEach(() => {
    fetchMock.resetMocks()
  })

  it('renders correctly', () => {
    const component = render(
        <NavigationContainer>
            <SelectLocationScreen />
        </NavigationContainer>
    )
    expect(component).toBeTruthy()
  })

  it('renders correctly with no initial point', () => {
    jest.resetAllMocks()
    jest.mock("@react-navigation/native", () => {
      return {
        ...jest.requireActual("@react-navigation/native"),
        useRoute: () => ({
          params: {
            initialLocation: undefined,
            onLocationChange: jest.fn()
          },
        }),
        useNavigation: () => ({
          navigate: mockNavigate,
          goBack: mockGoBack,
        }),
      }
    })
    const { getByText } = render(
        <NavigationContainer>
            <SelectLocationScreen />
        </NavigationContainer>
    )
    const confirmButton = getByText("Confirm")
    fireEvent.press(confirmButton)
    expect(mockGoBack).toHaveBeenCalled
    jest.resetAllMocks()
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

  it('handles point selection and fetches location name', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({
      address: {
        road: 'Rue Centrale',
        house_number: '1',
        town: 'Chavannes-près-Renens',
        postcode: '1022',
        country_code: 'ch',
      },
    }))

    const { getByTestId } = render(
      <NavigationContainer>
        <SelectLocationScreen />
      </NavigationContainer>
    )

    fireEvent.press(getByTestId('map'), {
      nativeEvent: {
        coordinate: { latitude: 46.5317455, longitude: 6.5706826 },
      },
    })

  })

  it('handles search query and updates map region', async () => {
    fetchMock.mockResponseOnce(JSON.stringify([{
      boundingbox: ['46.5300332', '46.5317455', '6.5706826', '6.5716539'],
      lat: '46.5300332',
      lon: '6.5706826',
    }]))

    const { getByPlaceholderText } = render(
      <NavigationContainer>
        <SelectLocationScreen />
      </NavigationContainer>
    )

    fireEvent.changeText(getByPlaceholderText('Search...'), 'EPFL')
    fireEvent(getByPlaceholderText('Search...'), 'submitEditing')

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith('https://nominatim.openstreetmap.org/search?q=EPFL&format=json')
    })
  })

  it('shows error toast on failed location search', async () => {
    fetchMock.mockReject(new Error('Failed to fetch'))

    const { getByPlaceholderText } = render(
      <NavigationContainer>
        <SelectLocationScreen />
      </NavigationContainer>
    )

    fireEvent.changeText(getByPlaceholderText('Search...'), 'Invalid Location')
    fireEvent(getByPlaceholderText('Search...'), 'submitEditing')

    await waitFor(() => {
      expect(showErrorToast).toHaveBeenCalledWith('Failed to search for a location, check your connection.')
    })
  })

})