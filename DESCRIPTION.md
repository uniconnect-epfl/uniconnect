# Project proposal: UniConnect

UniConnect is an application aimed at enhancing social connectivity and expanding social networks for both new and existing students at universities. Its primary goal is to simplify and enrich the process of forming new connections and broadening one's social circle within the university setting.
Problems we target:

- For students newly arriving at a university, forming connections can be daunting amidst an unfamiliar environment filled with unknown faces. This challenge is particularly pronounced for first-year and exchange students, who find themselves in a completely new social landscape. The absence of familiar networks often leaves these students struggling to build meaningful relationships in their new surroundings.
- As students progress through their university journey, their interests, both academically and socially, often evolve and become more specialized. Students in their second or third year may find their current social groups do not fully align with these evolving interests, particularly in niche or diverse subjects. This leads to a challenge in finding peers with similar specialized interests or those who engage in different, perhaps more advanced, academic discussions.
- There comes a point in every student's academic path where external expertise or assistance on a particular subject is crucial. However, reaching out to strangers for help is not always feasible or comfortable, and one’s immediate social circle might not always include individuals with the needed expertise. This creates a time-consuming process of searching and inquiring within one's network to find someone with the relevant knowledge or skills.
- Examples: Master’s choice, find project’s partner
  Our solution: UniConnect
  UniConnect is a social application designed for university students, aiming to enhance their ability to forge new connections within the campus community. The app is centered around a graph-based visualization that effectively maps out a user's social network. This key feature allows students to identify and reach out to friends of their friends, potentially expanding their social circle with a sense of trust and familiarity in the process of meeting new acquaintances
  The app includes features to filter and discover people within their existing social circles based on shared interests, academic pursuits, or other criteria. This not only facilitates finding like-minded individuals but also uncovers hidden connections within their current network. Additionally, users have the ability to manually add new contacts to the app, and the system suggests new connections based on shared interests and event participation, further personalizing the user experience.
  One of the standout features of UniConnect is its integration with university events. The app acts as a central hub for event information, enabling students to easily find and participate in campus activities. More importantly, it provides insights into which members of their close social network are attending specific events, opening up opportunities for real-life interactions and strengthening of community ties at these gatherings. This combination of social network visualization, personalized discovery, and event integration makes UniConnect a comprehensive tool for enhancing social engagement within the university setting.
  Functionalities requirements:
- Split app model:
  UniConnect will utilize Firebase for authentication, real-time data syncing, and backend services. Key functionalities include:

1. Firebase Authentication for secure user login/registration and password recovery.
2. Realtime Database for instant updates in social networks and events.
3. Firestore for storing user profiles and interests.
4. Cloud Functions for backend logic, like connection suggestions.
5. Cloud Storage for user-generated content like photos.
6. Firebase notification/email service to keep the users updated.

- User support: To access UniConnect, users are required to create an account and authenticate their identity. To streamline this process, the app will integrate Android's native Google authentication system.
- Sensor use: The app will leverage GPS, Bluetooth, and NFC technologies to identify nearby members of the user's social network who are attending the same events. Additionally, UniConnect will incorporate a QR code feature, utilizing the device's camera, to facilitate the easy addition of new contacts or event details directly into the app.
- Offline mode: UniConnect is designed to remain functional even without an internet connection. Utilizing Bluetooth and NFC, the app will enable users to discover nearby peers in offline mode. Key information, such as major events and details about the user's immediate social network, will be downloadable and accessible offline, ensuring continuous engagement and connectivity.
