import { Point } from "react-native-maps"

export type Announcement = {
    uid: string
    title: string
    location: string
    point?: Point
    description: string
    interests: string[]
    date: string
    }