import React from 'react'
import { render } from '@testing-library/react-native'
import { MyQrCodeScreen } from '../../../../screens/Profile/MyQrCode/MyQrCodeScreen'

describe('MyQrCodeScreen', () => {
  
  it('renders correctly', () => {
    const component = render(<MyQrCodeScreen />)
    expect(component).toBeTruthy()
  })
  
})