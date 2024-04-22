import React from 'react'
import { fireEvent, render } from '@testing-library/react-native'
import { ProfileNetwork } from '../../../../screens/Profile/ProfileNetwork/ProfileNetwork'

describe('ProfileNetwork', () => {
  
  it('renders correctly', () => {
    const component = render(<ProfileNetwork />)
    expect(component).toBeTruthy()
  })

  it('filters contacts based on search input', () => {
    const { getByText, getByPlaceholderText, queryByText } = render(<ProfileNetwork />)

    fireEvent.changeText(getByPlaceholderText('Search...'), 'Jocovi')
    expect(getByText('Jocović')).toBeTruthy()
    expect(queryByText('Hervé')).toBeNull()
    expect(queryByText('')).toBeNull()
    expect(queryByText('Abc')).toBeNull()

    fireEvent.changeText(getByPlaceholderText('Search...'), '')
    expect(getByText('Hervé')).toBeTruthy()
})
  
})