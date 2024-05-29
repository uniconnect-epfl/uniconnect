import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps"
import React from "react"
import { RouteProp, useRoute } from "@react-navigation/native"
import { View, Text } from "react-native"
import styles from "./styles" // Import styles
import { Event } from "../../types/Event"
import { BackArrow } from "../../components/BackArrow/BackArrow"
import EventMapModal from "./EventMapModal/EventMapModal"

const INITIAL_REGION = {
  latitude: 46.51858962578904,
  longitude: 6.566048509782951,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
}
type RootStackParamList = {
  EventMap: {
    onEventPress: (event: Event) => void
      events: Event[]
  }
}

type MapScreenRouteProp = RouteProp<RootStackParamList, 'EventMap'>

const EventMap = () => {

  const [clickedEvent, setClickedEvent] = React.useState<Event | null>(null)
  const [modalVisible, setModalVisible] = React.useState(false)

  const onModalEventPress = () => {
    setModalVisible(false)
    route.params.onEventPress(clickedEvent)
  }

  const onModalPressOut = () => {
    setModalVisible(false)
  }

  const route = useRoute<MapScreenRouteProp>()
  const events = route.params.events

  return (
    <View style={styles.container}>
      {/* Navigation Bar */}
      <BackArrow/>
      <View style={styles.navigationBar}>
        <Text style={styles.screenTitle}>Event Map</Text>
      </View>
      <EventMapModal
        event={clickedEvent}
        visible={modalVisible}
        onPressOut={onModalPressOut}
        onEventPress={onModalEventPress}
      />
      <MapView
        style={styles.map}
        initialRegion={INITIAL_REGION}
        showsUserLocation
        showsMyLocationButton
        provider={PROVIDER_GOOGLE}
      >
        {events.map((event, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: event.point.x, longitude: event.point.y }}
            onPress={() => {
              setClickedEvent(event)
              setModalVisible(true)
            }}
            testID={"marker-" + event.title}
          ></Marker>
        ))}
      </MapView>
    </View>
  )
}

export default EventMap
