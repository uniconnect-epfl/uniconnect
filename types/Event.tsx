
import { Point } from "react-native-maps"


export type Event = {
    uid: string
    title: string
    location: string
    point: Point
    date: Date
    description: string
    imageUrl: string
  }