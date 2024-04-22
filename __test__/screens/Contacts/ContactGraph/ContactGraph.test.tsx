import React from 'react'
import { render } from '@testing-library/react-native'
import ContactGraph from '../../../../screens/Contacts/ContactGraph/ContactGraph'

describe('ContactGraph', () => {
  
  it('renders correctly', () => {
    const component = render(<ContactGraph />)
    expect(component).toBeTruthy()
  })
  
})