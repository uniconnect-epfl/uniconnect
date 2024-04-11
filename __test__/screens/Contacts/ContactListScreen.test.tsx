import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import { ContactListScreen } from '../../../screens/Contacts/ContactListScreen'
import { Contact } from '../../../screens/Contacts/ContactListScreen'

describe('ContactListScreen', () => {
    const dummyData: Contact[] = [
        {uid: '1', firstName: 'Jocović', lastName: 'Dellpouelo', profilePictureUrl: '', description: 'This guy is very weird', interests: ['surfing', 'machine learning'], qualifications: []},
        {uid: '2', firstName: 'Stephano', lastName: 'Carasto', profilePictureUrl: '', description: 'No description', interests: [], qualifications: ['surfing', 'machine learning']},
        {uid: '3', firstName: 'Henrique', lastName: 'Nique', profilePictureUrl: '', description: 'Good question', interests: ['surfing'], qualifications: ['machine learning']},
        {uid: '4', firstName: 'Hervé', lastName: 'Delamontagne', profilePictureUrl: '', description: 'Description, description, description, loooooooooong descriiiiiiiiiiption, this is a veeeeeeeeeeeeeeeeeeeeeery loooooooooooooooooooooooooooooooooooooooooooong descriiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiption alala', interests: ['running'], qualifications: ['bowling']},
        {uid: '5', firstName: 'Charles', lastName: 'Dupond', profilePictureUrl: '', description: 'Aaaaaaaaaaaaaaaaaaaa v v v v v v v v v a a a a a a a a a a a a a a a a a a a a a a a aaa a a a a a a a a a a a a a aa a a a a a a a a a a a a a a a a a a a a a a aaa a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a aaa a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a aaa a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a aaa a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a', interests: ['machine learning'], qualifications: ['running', 'bowling']},
        {uid: '6', firstName: 'Charlotte', lastName: 'Motte', profilePictureUrl: '', description: 'Bbbbbbbbbbbbbbbbbb', interests: ['walking'], qualifications: ['running']},
        {uid: '7', firstName: 'Charlović', lastName: 'Poutine', profilePictureUrl: '', description: 'Description 7', interests: [], qualifications: ['python', 'java', 'C++']},
        {uid: '8', firstName: 'Stephanović', lastName: 'Vladimir', profilePictureUrl: '', description: 'I love fish', interests: ['surfing', 'machine learning'], qualifications: ['biology']},
        {uid: '9', firstName: 'Lulu', lastName: 'Nom', profilePictureUrl: '', description: 'I love bamboo', interests: ['surfing', 'machine learning'], qualifications: ['litterature']},
        {uid: '10', firstName: 'Lili', lastName: 'De', profilePictureUrl: '', description: '19 + 4 = 22', interests: ['surfing', 'machine learning'], qualifications: ['a', 'b', 'c', 'd', 'e', 'f', 'h']},
    ]

    it('renders the screen', () => {
        const component = render(<ContactListScreen initialContacts={dummyData} />)
        expect(component).toBeTruthy()
    })

    it('renders all items from the contacts list', async () => {
        const { findByText } = render(<ContactListScreen initialContacts={dummyData} />)

        for(const contact of dummyData){
            const element = await findByText(contact.firstName)
            expect(element).toBeTruthy()
        }
    })
    
    it('filters contacts based on search input', async () => {
        const { getByText, getByPlaceholderText, queryByText } = render(<ContactListScreen initialContacts={dummyData} />)

        fireEvent.changeText(getByPlaceholderText('Search...'), 'Jocovi')
        expect(getByText('Jocović')).toBeTruthy()
        expect(queryByText('Hervé')).toBeNull()
        expect(queryByText('')).toBeNull()
        expect(queryByText('Abc')).toBeNull()

        fireEvent.changeText(getByPlaceholderText('Search...'), '')
        expect(getByText('Hervé')).toBeTruthy()
    })
    
    it('displays correct contact details', () => {
        const { getByText } = render(<ContactListScreen initialContacts={dummyData} />)
        const firstContact = dummyData[0];
        expect(getByText(firstContact.firstName)).toBeTruthy()
        expect(getByText(firstContact.description)).toBeTruthy()
    })
    
    it('updates tab selection on button press', () => {
        const { getByText } = render(<ContactListScreen initialContacts={dummyData} />)

        fireEvent.press(getByText('Graph View'))
        expect(getByText('Graph View').props.style[1].fontWeight).toBe('bold')
        expect(getByText('Plain View').props.style[1]).not.toHaveProperty('fontWeight')
        fireEvent.press(getByText('Plain View'))
        expect(getByText('Graph View').props.style[1]).not.toHaveProperty('fontWeight')
        expect(getByText('Plain View').props.style[1].fontWeight).toBe('bold')
    })

})



