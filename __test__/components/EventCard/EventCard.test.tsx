// Test: EventCard component
import { render } from '@testing-library/react-native'
import EventCard from '../../../components/EventCard/EventCard'
import React from 'react'


describe('EventCard', () => {
  
  it('renders the card', () => {
    const component = render(
        <EventCard 
            title='title'
            location='location'
            latitude={46.51858962578904}
            longitude={6.566048509782951}
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
    const latitude = 46.51858962578904
    const longitude = 6.566048509782951
    const description = 'description'
    const date = 'date'
    const imageUrl = 'imageUrl'

    const {getByText } = render(
        <EventCard 
            title={title}
            location={location}
            latitude={latitude}
            longitude={longitude}
            description={description}
            date={date}
            imageUrl={imageUrl}
        />
    )
    expect(getByText(title)).toBeTruthy()
    expect(getByText(location)).toBeTruthy()
    expect(getByText(description)).toBeTruthy()
    expect(getByText(date)).toBeTruthy()

  })
  
})