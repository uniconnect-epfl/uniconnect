import { Point } from "react-native-maps"

export type Event = {
    uid: string
    title: string
    point: string
    location: Point
    date: Date
    description: string
    imageUrl: string
  }