import { Contact } from "../../types/Contact"

const contact_1: Contact = {
  uid: "89",
  firstName: "Jean",
  lastName: "Smith",
  profilePictureUrl:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoQ2C2f7eqsQvU6_T183x8ASGJv7mqJ2xy_KLDIZOJsA&s",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed fermentum justo id nisl commodo, sit amet viverra massa convallis.",
  location: "Los Angeles",
  interests: ["1", "2"],
  events: ["1", "2"],
  friends: ["7"],
}

const contact_2: Contact = {
  uid: "32",
  firstName: "Bob",
  lastName: "Johnson",
  profilePictureUrl:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYloKopOZ_oudmWTNK-xVmdVPxdKsgKniHbr8Vr0hk1g&s",
  description:
    "Nulla euismod ex at magna consequat, eget venenatis risus maximus.",
  location: "Chicago",
  interests: ["1", "2"],
  events: ["1", "2"],
  friends: ["7", "6"],
}

const contact_3: Contact = {
  uid: "67",
  firstName: "Carol",
  lastName: "Williams",
  profilePictureUrl:
    "https://img.fixthephoto.com/blog/images/gallery/news_preview_mob_image__preview_11368.png",
  description:
    "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
  location: "Houston",
  interests: ["1", "2"],
  events: ["1", "2"],
  friends: ["7"],
}

export const mockContactsL2: Contact[] = [contact_1, contact_2, contact_3]
