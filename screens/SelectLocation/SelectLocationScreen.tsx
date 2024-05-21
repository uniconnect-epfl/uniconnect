import React, { View, Text, TouchableOpacity } from "react-native"
import { styles } from "./styles"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import MapView, { Marker, PROVIDER_GOOGLE, Point, Region } from "react-native-maps"
import { useEffect, useState } from "react"
import InputField from "../../components/InputField/InputField"
import { globalStyles } from "../../assets/global/globalStyles"

type RootStackParamList = {
    SelectLocationScreen: {
        initialPoint: Point | undefined,
        onLocationChange: (point: Point | undefined) => void,
    }
}
  
type SelectLocationScreenRouteProps = RouteProp<RootStackParamList, "SelectLocationScreen">

export const SelectLocationScreen = () => {
    const { onLocationChange, initialPoint } = useRoute<SelectLocationScreenRouteProps>().params
    const navigation = useNavigation()
    const [location, setLocation] = useState<Point | undefined>(initialPoint)
    const [locationName, setLocationName] = useState("")

    const initialRegion: Region = {
        latitude: 46.51858962578904,
        longitude: 6.566048509782951,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    }

    useEffect(() => {
        onLocationChange(location)
    }, [onLocationChange, location])


    return (
      <View style={styles.container}>

        <View style={styles.header}>
            <Text style={[globalStyles.boldText, styles.screenTitle]}>
                Select a location
            </Text>
        </View>   

        <View style={styles.inputFieldContainer}>
            <InputField
                placeholder="Turing Avenue 69"
                value={locationName}
                onChangeText={setLocationName}
            />
        </View>

        <View style={styles.mapContainer}>
            <MapView 
                style={styles.map} 
                initialRegion={initialRegion} 
                showsUserLocation
                showsMyLocationButton
                provider={PROVIDER_GOOGLE}
                onPress={(e) => {
                    const newLocation: Point = {x: e.nativeEvent.coordinate.latitude, y: e.nativeEvent.coordinate.longitude }
                    setLocation(newLocation)
                }}
                >
                { location !== undefined && 
                    <Marker
                        key={"location"} 
                        coordinate={{
                                latitude: location.x,
                                longitude: location.y
                            }}>

                    </Marker>
                }
            </MapView>
        </View>

        <TouchableOpacity
            style={styles.confirmButton}
            onPress={() => {
                navigation.goBack()
            }}>
            <Text style={globalStyles.boldText}> 
                Confirm 
            </Text>
        </TouchableOpacity>

      </View>
    )
}
