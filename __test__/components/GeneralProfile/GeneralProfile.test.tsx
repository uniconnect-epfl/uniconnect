import React from 'react'
import { render } from '@testing-library/react-native'
import GeneralProfile from '../../../components/GeneralProfile/GeneralProfile'

describe('GeneralProfile', () => {
  
  it('renders the screen', () => {
    const component = render(
        <GeneralProfile 
            name="name"
            surname="surname"
            location="EPFL"
        />
    )
    expect(component).toBeTruthy()
  })

  it('renders right informations', () => {
    const name = "naajeh ceai nncueia of v "
    const surname = "jdvalgn jre fher verh vndjk nvdsk b"
    const location = "vjksldgb reber erj bvhjd bjks nclnewa"

    const { queryByText, getByText } = render(
        <GeneralProfile 
            name={name}
            surname={surname}
            location={location}
        />
    )
    expect(getByText(name + " " + surname)).toBeTruthy()
    expect(getByText(location)).toBeTruthy()
    expect(queryByText("name")).toBeFalsy()
  })
  
})