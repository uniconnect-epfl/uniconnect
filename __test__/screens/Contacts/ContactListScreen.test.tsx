import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import { ContactListScreen } from '../../../screens/Contacts/ContactListScreen'

describe('ContactListScreen', () => {

    it('renders the screen', () => {
        const component = render(<ContactListScreen />)
        expect(component).toBeTruthy()
    })

    it('filters contacts based on search input', () => {
        const { getByText, getByPlaceholderText, queryByText } = render(<ContactListScreen />)

        fireEvent.changeText(getByPlaceholderText('Search...'), 'Jocovi')
        expect(getByText('Jocović')).toBeTruthy()
        expect(queryByText('Hervé')).toBeNull()
        expect(queryByText('')).toBeNull()
        expect(queryByText('Abc')).toBeNull()

        fireEvent.changeText(getByPlaceholderText('Search...'), '')
        expect(getByText('Hervé')).toBeTruthy()
    })
    
    it('displays correct contact details', () => {
        const { getByText } = render(<ContactListScreen />)
        expect(getByText('Jocović')).toBeTruthy()
        expect(getByText('This guy is very weird')).toBeTruthy()
    })
    
    it('updates tab selection on button press', () => {
        const { getByText } = render(<ContactListScreen />)

        fireEvent.press(getByText('Graph View'))
        expect(getByText('Graph View').props.style[1].fontWeight).toBe('bold')
        expect(getByText('Plain View').props.style[1]).not.toHaveProperty('fontWeight')
        fireEvent.press(getByText('Plain View'))
        expect(getByText('Graph View').props.style[1]).not.toHaveProperty('fontWeight')
        expect(getByText('Plain View').props.style[1].fontWeight).toBe('bold')
    })

})



