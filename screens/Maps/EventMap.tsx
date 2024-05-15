import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps"
import React from "react"
import { RouteProp, useRoute } from "@react-navigation/native"
import { View, Text } from "react-native"
import styles from "./styles" // Import styles
import { Event } from "../../types/Event"
import { BackArrow } from "../../components/BackArrow/BackArrow"


const INITIAL_REGION = {
  latitude: 46.51858962578904,
  longitude: 6.566048509782951,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
}
type RootStackParamList = {
  EventMap: {
      events: Event[]
  }
}

type MapScreenRouteProp = RouteProp<RootStackParamList, 'EventMap'>;

const EventMap = () => {
  const route = useRoute<MapScreenRouteProp>() 
  const events = route.params.events

  return (
    <View style={styles.container}>
      {/* Navigation Bar */}
      <BackArrow/>
      <View style={styles.navigationBar}>
        <Text style={styles.screenTitle}>Event Map</Text>
      </View>
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
            title={event.title}
            coordinate={{ latitude: event.point.x, longitude: event.point.y}}
          >
            <Callout
              onPress={() => console.log("Callout pressed:", event.title)}
            >
              <View style={styles.calloutView}>
                {/* Next feature to add it allow to move to the Event page clicking on the event */}
                <Text style={styles.calloutTextTitle}>{event.title}</Text>
                <Text style={styles.calloutTextLocation}>{event.location}</Text>
                <Text>{event.date.toLocaleDateString()}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </View>
  )
}

export default EventMap
