import React from 'react'
import { render } from '@testing-library/react-native'
import Form from '../../../components/divider/divider'

describe('Form', () => {
  
  it('renders the screen', () => {
    const component = render(<Form />)
    expect(component).toBeTruthy()
  })
  
})