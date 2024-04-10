import React from 'react';
import { render } from '@testing-library/react'
import { ContactListScreen } from '../../../screens/Contacts/ContactListScreen';
import { Contact } from '../../../screens/Contacts/ContactListScreen';



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
        {uid: '11', firstName: 'Lala', lastName: 'Famille', profilePictureUrl: '', description: 'I\'m doing university for fun', interests: ['a', 'b', 'c', 'd', 'e', 'f', 'h'], qualifications: ['a', 'b', 'c', 'd', 'e', 'f', 'h']},
        {uid: '12', firstName: 'Abc', lastName: 'Onu', profilePictureUrl: '', description: 'Didn\'t want a description', interests: [], qualifications: ['a', 'b', 'c', 'd', 'e', 'f', 'h']},
        {uid: '13', firstName: 'Def', lastName: 'Steph', profilePictureUrl: '', description: '-', interests: ['movies'], qualifications: ['history']},
        {uid: '14', firstName: 'Hij', lastName: 'Non', profilePictureUrl: '', description: 'Mataphisical question', interests: [], qualifications: []},
    ]

    it('renders the complete list of contacts', () => {
        const component = render(<ContactListScreen initialContacts={dummyData} />);
        expect(component).toBeTruthy()
      });
})



