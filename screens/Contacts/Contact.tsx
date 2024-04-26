export default class Contact {
  // Unique identifier for the contact
  uid: string

  // First name of the contact
  firstName: string

  // Last name of the contact
  lastName: string

  // Profile picture URL of the contact
  profilePictureUrl: string

  // Description of the contact
  description: string

  // TODO: For now this is a string but we will check for type later
  location: string

  // UID of interests (They will be retrieved from the database when needed)
  interests: string[]

  // UID of events (They will be retrieved from the database when needed)
  events: string[]

  // Friends' uid of the contact
  friends: string[]

  /**
   *
   * @param uid - Unique identifier for the contact
   * @param firstName - First name of the contact
   * @param lastName - Last name of the contact
   * @param profilePictureUrl - Profile picture URL of the contact
   * @param description - Description of the contact
   * @param interests - Interests of the contact
   * @param events - Events the contact is attending
   */
  constructor(
    uid: string,
    firstName: string,
    lastName: string,
    profilePictureUrl: string,
    description: string,
    location: string,
    interests: string[],
    events: string[],
    friends: string[] = []
  ) {
    this.uid = uid
    this.firstName = firstName
    this.lastName = lastName
    this.profilePictureUrl = profilePictureUrl
    this.description = description
    this.location = location
    this.interests = interests
    this.events = events
    this.friends = friends
  }

  getUid(): string {
    return this.uid
  }

  getFullName(): string {
    return this.firstName + " " + this.lastName
  }

  getProfilePictureUrl(): string {
    return this.profilePictureUrl
  }

  getDescription(): string {
    return this.description
  }

  /**
   *
   * @returns - The interests' uid of the contact
   */
  getInterests(): string[] {
    return this.interests
  }

  /**
   *
   * @returns - The events' uid of the contact
   */
  getEvents(): string[] {
    return this.events
  }

  getFriends(): string[] {
    return this.friends
  }

  // TODO: For now this is a string but we will check for type later
  getLocation(): string {
    return this.location
  }

  similarity(contact: Contact): number {
    let similarity = 0
    // TODO: Implement similarity function according to events, interests, location, etc.

    // For now, we will just compare the full name
    if (this.getFullName() === contact.getFullName()) {
      similarity += 1
    }

    return similarity
  }
}

// TODO: Implement this function when we have the database
// export function createContact(data: any): Contact {
//   return new Contact(
//     data.uid,
//     data.firstName,
//     data.lastName,
//     data.profilePictureUrl,
//     data.description,
//     data.location,
//     data.interests,
//     data.events,
//     data.friends
//   )
// }
