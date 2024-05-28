
import { Point } from "react-native-maps"


export type Event = {
    uid: string
    title: string
    location: string
    point: Point
    date: string
    description: string
    imageUrl: string
    participants: string[]
    host: string
    interests: string[]
  }