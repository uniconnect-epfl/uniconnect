import React, { View, Text, TouchableOpacity } from "react-native"
import { styles } from "./styles"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import MapView, { Marker, PROVIDER_GOOGLE, Point } from "react-native-maps"
import { useEffect, useState } from "react"
import InputField from "../../components/InputField/InputField"
import { globalStyles } from "../../assets/global/globalStyles"
import { showErrorToast } from "../../components/ToastMessage/toast"

type RootStackParamList = {
    SelectLocationScreen: {
        initialPoint: Point | undefined,
        onLocationChange: (locationName: string, point: Point | undefined) => void,
    }
}
  
type SelectLocationScreenRouteProps = RouteProp<RootStackParamList, "SelectLocationScreen">

export const SelectLocationScreen = () => {
    const { onLocationChange, initialPoint } = useRoute<SelectLocationScreenRouteProps>().params
    const navigation = useNavigation()
    const [location, setLocation] = useState<Point | undefined>(initialPoint)
    const [locationName, setLocationName] = useState("")
    const [locationSearch, setLocationSearch] = useState("")
    const [region, setRegion] = useState({
        latitude: 46.51858962578904,
        longitude: 6.566048509782951,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    })

    const GOOGLE_MAPS_KEY = "CACA DE MERDE"

    useEffect(() => {
        onLocationChange(locationName, location)
    }, [onLocationChange, locationName, location])

    const handlePointSelection = async (newLocation: Point) => {
        setLocation(newLocation)
        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${newLocation.x},${newLocation.y}&key=${GOOGLE_MAPS_KEY}`

        try {
          const response = await fetch(url)
          const data = await response.json()

          if (data.status === 'OK') {
            const address = data.results[0].formatted_address
            setLocationName(address)
          } else {
            console.log("point selection data status: " + data.status)
          }
        } catch (error) {
          showErrorToast("Failed to find a location, check your connection.")
        }
    }

    const handleSearch = async (text: string) => {
        setLocationSearch(text)
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(text)}&key=${GOOGLE_MAPS_KEY}`
    
        try {
          const response = await fetch(url)
          const data = await response.json()
    
          if (data.status === 'OK') {
            const { lat, lng } = data.results[0].geometry.location
            const newRegion = {
              ...region,
              latitude: lat,
              longitude: lng,
            }
    
            setRegion(newRegion)
            setLocation({x: lat, y: lng,})
            setLocationName(text)
          } else {
              console.log("address search data status: " + data.status)
          }
        } catch (error) {
          showErrorToast("Failed to find a location, check your connection.")
        }
    }

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
                value={locationSearch}
                onChangeText={handleSearch}
            />
        </View>

        <View style={styles.mapContainer}>
            <MapView 
                style={styles.map} 
                region={region}
                onRegionChangeComplete={setRegion}
                showsUserLocation
                showsMyLocationButton
                provider={PROVIDER_GOOGLE}
                onPress={(e) => {
                    const newLocation: Point = {x: e.nativeEvent.coordinate.latitude, y: e.nativeEvent.coordinate.longitude }
                    handlePointSelection(newLocation)
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
