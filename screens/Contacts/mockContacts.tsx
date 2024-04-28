import { Contact } from "./Contact"

const contact_1: Contact = {
  uid: "0",
  firstName: "Alice",
  lastName: "Smith",
  profilePictureUrl:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoQ2C2f7eqsQvU6_T183x8ASGJv7mqJ2xy_KLDIZOJsA&s",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed fermentum justo id nisl commodo, sit amet viverra massa convallis.",
  location: "Los Angeles",
  interests: ["1", "2"],
  events: ["1", "2"],
  friends: ["1", "2", "7", "8"],
}

const contact_2: Contact = {
  uid: "1",
  firstName: "Bob",
  lastName: "Johnson",
  profilePictureUrl:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYloKopOZ_oudmWTNK-xVmdVPxdKsgKniHbr8Vr0hk1g&s",
  description:
    "Nulla euismod ex at magna consequat, eget venenatis risus maximus.",
  location: "Chicago",
  interests: ["1", "2"],
  events: ["1", "2"],
  friends: ["3", "4"],
}

const contact_3: Contact = {
  uid: "2",
  firstName: "Carol",
  lastName: "Williams",
  profilePictureUrl:
    "https://img.fixthephoto.com/blog/images/gallery/news_preview_mob_image__preview_11368.png",
  description:
    "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
  location: "Houston",
  interests: ["1", "2"],
  events: ["1", "2"],
  friends: ["5", "6", "9"],
}

const contact_4: Contact = {
  uid: "3",
  firstName: "David",
  lastName: "Brown",
  profilePictureUrl:
    "https://img.freepik.com/premium-photo/profile-picture-happy-young-caucasian-man-spectacles-show-confidence-leadership-headshot-portrait-smiling-millennial-male-glasses-posing-indoors-home-employment-success-concept_774935-1446.jpg",
  description:
    "Vivamus non odio nec quam sollicitudin volutpat. Cras ullamcorper vehicula consequat.",
  location: "Miami",
  interests: ["1", "2"],
  events: ["1", "2"],
}

const contact_5: Contact = {
  uid: "4",
  firstName: "Eva",
  lastName: "Davis",
  profilePictureUrl:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwzqBOQU8-rmsHcEGZ1imKdw5fefN4G0gkyZdM6ydMNg&s",
  description:
    "Suspendisse potenti. Nullam dictum, velit a eleifend convallis, nibh turpis aliquam neque, a dictum urna orci quis dolor.",
  location: "San Francisco",
  interests: ["1", "2", "7", "8", "9", "10", "11"],
  events: ["1", "2", "11", "12"],
}

const contact_6: Contact = {
  uid: "5",
  firstName: "Frank",
  lastName: "Wilson",
  profilePictureUrl:
    "https://t3.ftcdn.net/jpg/03/62/40/80/360_F_362408093_AlwyWJQbyc6edRlXGaGz3xquwzLGXhkX.jpg",
  description:
    "Donec tempus quam vitae felis ullamcorper, eget fringilla nulla commodo.",
  location: "Seattle",
  interests: ["1", "2", "7", "8", "9"],
  events: ["1", "2", "7", "8"],
}

const contact_7: Contact = {
  uid: "6",
  firstName: "Grace",
  lastName: "Martinez",
  profilePictureUrl:
    "https://media.licdn.com/dms/image/C5603AQG5Ex3k-bgPLw/profile-displayphoto-shrink_400_400/0/1621833595761?e=2147483647&v=beta&t=y2rONxfxxg-yKW5D1LqzHoeHFu7p_E3R6kHgTxcv0pc",
  description: "Praesent eleifend dapibus odio, nec commodo est aliquet vitae.",
  location: "Dallas",
  interests: ["1", "2", "7", "8"],
  events: ["1", "2", "7", "8"],
}

const contact_8: Contact = {
  uid: "7",
  firstName: "Henry",
  lastName: "Taylor",
  profilePictureUrl:
    "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp",
  description:
    "Fusce rhoncus nunc eu arcu feugiat tincidunt. Proin vulputate tellus ac fermentum bibendum.",
  location: "Atlanta",
  interests: ["17", "18"],
  events: [],
}

const contact_9: Contact = {
  uid: "8",
  firstName: "Isabella",
  lastName: "Rodriguez",
  profilePictureUrl:
    "https://i.pinimg.com/236x/da/fd/f2/dafdf25168edcb2f0e1d8702797946cc.jpg",
  description:
    "Integer vel ultricies lorem. Curabitur sit amet quam non nisl eleifend convallis at non elit.",
  location: "Phoenix",
  interests: ["1"],
  events: ["1"],
}

const contact_10: Contact = {
  uid: "9",
  firstName: "Jack",
  lastName: "Garcia",
  profilePictureUrl:
    "https://headshots-inc.com/wp-content/uploads/2021/01/FINAL-Blog-Images.jpg",
  description:
    "Nam nec ullamcorper libero. Vestibulum in turpis in nunc fringilla pharetra.",
  location: "Denver",
  interests: ["1", "2"],
  events: ["1", "78", "9", "10"],
}

export const mockContacts: Contact[] = [
  contact_1,
  contact_2,
  contact_3,
  contact_4,
  contact_5,
  contact_6,
  contact_7,
  contact_8,
  contact_9,
  contact_10,
]
