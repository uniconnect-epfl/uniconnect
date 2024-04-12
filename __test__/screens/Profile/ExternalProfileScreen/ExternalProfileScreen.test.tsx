import React from 'react'
import { render } from '@testing-library/react-native'
import { ExternalProfileScreen } from '../../../../screens/Profile/ExternalProfileScreen/ExternalProfileScreen'

describe('ExternalProfileScreen', () => {
  
  it('renders the screen', () => {
    const component = render(<ExternalProfileScreen />)
    expect(component).toBeTruthy()
  })

})