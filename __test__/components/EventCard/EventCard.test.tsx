// Test: EventCard component
import { render } from '@testing-library/react-native'
import EventCard from '../../../components/EventCard/EventCard'
import React from 'react'
import { Event } from '../../../types/Event'
import { Point } from 'react-native-maps'
import { View } from 'react-native'

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useContext: jest.fn(() => ({uid: 'uid', name: 'name', imageUrl: 'imageUrl'})),
}))

describe('EventCard', () => {
  
  it('renders the card', () => {

    const point: Point = { x: 47.238458, y: 5.984155 }
    const event: Event = {
        uid: 'uid',
        title: 'title',
        location: 'location',
        point: point,
        description: 'description',
        date: "2024-10-03T18:00:00Z",
        imageUrl: 'imageUrl',
        participants: ['participant1', 'participant2'],
        host: 'host'
    }
    const component = render(
        <EventCard event={event} userImages={{}}/>
    )
    expect(component).toBeTruthy()
  })

  it('renders right informations', () => {
    const point: Point = { x: 47.238458, y: 5.984155 }
    const event: Event = {
      uid: 'uid',
      title: 'title',
      location: 'location',
      point: point,
      description: 'description',
      date: "2024-10-03T18:00:00Z",
      imageUrl: 'imageUrl',
      participants: ['participant1', 'participant2'],
      host: 'host'
    }

    const {getByText } = render(
        <View>
            <EventCard event={event} userImages={{}}/>
        </View>
    )
    expect(getByText(event.title)).toBeTruthy()
    expect(getByText(event.location)).toBeTruthy()

  })
  
})