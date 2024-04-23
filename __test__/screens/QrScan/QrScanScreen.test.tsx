import React from 'react'
import { render } from '@testing-library/react-native'
import QrScanScreen from '../../../screens/QrScan/QrScanScreen'

describe('QrScanScreen', () => {
    it('renders correctly', () => {
        const component = render(<QrScanScreen/>)
        expect(component).toBeTruthy()
    })
})
