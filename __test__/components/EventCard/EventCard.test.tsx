// Test: EventCard component
import { render } from '@testing-library/react-native'
import EventCard from '../../../components/EventCard/EventCard'
import React = require('react')

describe('EventCard', () => {
  
  it('renders the card', () => {
    const component = render(
        <EventCard 
            title='title'
            location='location'
            description='description'
            date='date'
            imageUrl='imageUrl'
        />
    )
    expect(component).toBeTruthy()
  })

  it('renders right informations', () => {
    const title = 'title'
    const location = 'location'
    const description = 'description'
    const date = 'date'
    const imageUrl = 'imageUrl'

    const { queryByText, getByText } = render(
        <EventCard 
            title={title}
            location={location}
            description={description}
            date={date}
            imageUrl={imageUrl}
        />
    )
    expect(getByText(title)).toBeTruthy()
    expect(getByText(location)).toBeTruthy()
    expect(getByText(description)).toBeTruthy()
    expect(getByText(date)).toBeTruthy()
    expect(queryByText('title')).toBeFalsy()

  })
  
})