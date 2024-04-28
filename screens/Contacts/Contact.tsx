export type Contact = {
  uid: string
  firstName: string
  lastName: string
  profilePictureUrl: string
  description: string
  // TODO: For now this is a string but we will check for type later
  location: string
  interests: string[]
  events: string[]
  friends?: string[]
}
