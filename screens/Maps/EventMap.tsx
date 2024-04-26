import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps"
import React from "react"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { event } from "../Home/HomeScreen"
import { View, Text, TouchableOpacity } from "react-native"
import styles from "./styles" // Import styles
import { Ionicons } from "@expo/vector-icons"

const INITIAL_REGION = {
  latitude: 46.51858962578904,
  longitude: 6.566048509782951,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
}

type MapScreenRouteProp = RouteProp<{ params: { events: event[] } }, "params">

export default function EventMap() {
  const route = useRoute<MapScreenRouteProp>()
  const events = route.params.events
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      {/* Navigation Bar */}
      <View style={styles.navigationBar}>
        <TouchableOpacity testID='back-button' onPress={() => navigation.goBack()} style={styles.backButton}>
          {/* Using Ionicons for the back button icon */}
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
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
            coordinate={{
              latitude: event.latitude,
              longitude: event.longitude,
            }}
            testID={`marker-${index}`}
          >
            <Callout
              onPress={() => console.log("Callout pressed:", event.title)}
            >
              <View style={styles.calloutView}>
                {/* Next feature to add it allow to move to the Event page clicking on the event */}
                <Text style={styles.calloutTextTitle}>{event.title}</Text>
                <Text style={styles.calloutTextLocation}>{event.location}</Text>
                <Text>{event.date}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </View>
  )
}
