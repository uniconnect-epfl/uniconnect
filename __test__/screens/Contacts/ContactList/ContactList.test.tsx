import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import ContactList from '../../../../screens/Contacts/ContactList/ContactList'


jest.mock('react-native-safe-area-context', () => {
    const inset = {top: 0, right: 0, bottom: 0, left: 0}
    return {
      SafeAreaProvider: jest.fn(({children}) => children),
      SafeAreaConsumer: jest.fn(({children}) => children(inset)),
      useSafeAreaInsets: jest.fn(() => inset),
      useSafeAreaFrame: jest.fn(() => ({x: 0, y: 0, width: 390, height: 844})),
    }
})

describe('ContactList', () => {

    const mockFunc = jest.fn()

    beforeEach(() => {
        mockFunc.mockClear()
    })

    it('renders the screen', () => {
        const component = render(<ContactList onContactPress={() => mockFunc} />)
        expect(component).toBeTruthy()
    })

    it('filters contacts based on search input', () => {
        const { getByText, getByPlaceholderText, queryByText } = render(<ContactList onContactPress={() => mockFunc} />)

        fireEvent.changeText(getByPlaceholderText('Search...'), 'Jocovi')
        expect(getByText('Jocović')).toBeTruthy()
        expect(queryByText('Hervé')).toBeNull()
        expect(queryByText('')).toBeNull()
        expect(queryByText('Abc')).toBeNull()

        fireEvent.changeText(getByPlaceholderText('Search...'), '')
        expect(getByText('Hervé')).toBeTruthy()
    })
    
    it('displays correct contact details', () => {
        const { getByText } = render(<ContactList onContactPress={() => mockFunc} />)
        expect(getByText('Jocović')).toBeTruthy()
        expect(getByText('This guy is very weird')).toBeTruthy()
    })

})


