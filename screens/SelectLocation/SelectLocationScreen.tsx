import React, { View, Text, TouchableOpacity } from "react-native"
import { styles } from "./styles"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import MapView, { Marker, Point } from "react-native-maps"
import { useEffect, useState } from "react"

type RootStackParamList = {
    SelectLocationScreen: {
        onLocationChange: (point: Point) => void,
    }
}
  
type SelectLocationScreenRouteProps = RouteProp<RootStackParamList, "SelectLocationScreen">

export const SelectLocationScreen = () => {
    const { onLocationChange } = useRoute<SelectLocationScreenRouteProps>().params
    const navigation = useNavigation()
    const [region, setRegion] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    })

    useEffect(() => {
        onLocationChange({x: region.latitude, y: region.longitude})
    }, [onLocationChange, region])


    return (
      <View style={styles.container}>
        <MapView 
            style={styles.map} 
            initialRegion={region} 
            onRegionChangeComplete={setRegion}>
            <Marker 
                coordinate={region} 
            />
        </MapView>
        <TouchableOpacity
            style={styles.confirmButton}
            onPress={() => navigation.goBack()}>
            <Text> 
                Confirm 
            </Text>
        </TouchableOpacity>
      </View>
    )
}
