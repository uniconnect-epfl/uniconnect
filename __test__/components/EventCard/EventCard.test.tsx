// Test: EventCard component
import { render } from '@testing-library/react-native'
import EventCard from '../../../components/EventCard/EventCard'
import React from 'react'
import { Event } from '../../../types'

import { Point } from 'react-native-maps'
import { View } from 'react-native'



describe('EventCard', () => {
  
  it('renders the card', () => {

    const point: Point = { x: 47.238458, y: 5.984155 }
    const date = new Date()
    const event: Event = {
        uid: 'uid',
        title: 'title',
        location: 'location',
        point: point,
        description: 'description',
        date: date,
        imageUrl: 'imageUrl'
    }
    const component = render(
        <EventCard event={event}/>
    )
    expect(component).toBeTruthy()
  })

  it('renders right informations', () => {
    const point: Point = { x: 47.238458, y: 5.984155 }
    const date = new Date()
    const event: Event = {
        uid: 'uid',
        title: 'title',
        location: 'location',
        point: point,
        description: 'description',
        date: date,
        imageUrl: 'imageUrl'
    }

    const {getByText } = render(
        <View>
            {EventCard(event)}
        </View>
    )
    expect(getByText(event.title)).toBeTruthy()
    expect(getByText(event.location)).toBeTruthy()
    expect(getByText(event.description)).toBeTruthy()

  })
  
})