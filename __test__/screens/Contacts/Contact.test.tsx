import { mockContacts } from "../../../screens/Contacts/mockContacts"

describe("Contact", () => {
  const contacts = mockContacts

  it("should call helper functions", () => {
    const contact = contacts[0]
    expect(contact.getFullName()).toEqual(
      contact.firstName + " " + contact.lastName
    )
    expect(contact.getProfilePictureUrl()).toEqual(contact.profilePictureUrl)
    expect(contact.getDescription()).toEqual(contact.description)
    expect(contact.getInterests()).toEqual(contact.interests)
    expect(contact.getEvents()).toEqual(contact.events)
    expect(contact.getFriends()).toEqual(contact.friends)
    expect(contact.getLocation()).toEqual(contact.location)

    const contact2 = contacts[1]

    const similarity = contact.similarity(contact2)
    expect(similarity).toBe(0)
  })
})
