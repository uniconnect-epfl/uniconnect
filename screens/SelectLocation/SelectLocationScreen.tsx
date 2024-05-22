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
        // default region is EPFL
        latitude: 46.51858962578904,
        longitude: 6.566048509782951,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    })

    useEffect(() => {
        onLocationChange(locationName, location)
    }, [onLocationChange, locationName, location])

    const handlePointSelection = async (newLocation: Point) => {
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${newLocation.x}&lon=${newLocation.y}&addressdetails=1`
      console.log(url)
      try {
        const response = await fetch(url)
        const data = await response.json()
        if (data.error) {
          showErrorToast("Can't find a location here.")
        } else {
          const {
            road,
            house_number,
            town,
            postcode,
            country_code
          } = data.address
          const address = `${road} ${house_number}, ${postcode} ${town}, ${country_code}`
          setLocationSearch(address)
          setLocationName(address)
          setLocation(newLocation)
        }
      } catch (error) {
        showErrorToast("Failed to search for a location, check your connection.")
      }
    }

    const handleSearchQuery = async () => {
        const url = `https://nominatim.openstreetmap.org/search?q=${locationSearch}&format=json`
        try {
          // request to open street map
          const response = await fetch(url)
          const data = await response.json()
          // check if we recived data or didn't find anything
          if (Object.keys(data).length > 0) {
            const { boundingbox, lat, lon } = data[0]
            // set new map parameters
            setRegion({
              latitude: parseFloat(lat),
              longitude: parseFloat(lon),
              latitudeDelta: boundingbox[3] - boundingbox[2],
              longitudeDelta: boundingbox[1] - boundingbox[0]
            })
            setLocation({x: parseFloat(lat), y: parseFloat(lon)})
            setLocationName(locationSearch)
          } else {
              showErrorToast("Location not found.")
          }
        } catch (error) {
          showErrorToast("Failed to search for a location, check your connection.")
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
                placeholder="Search..."
                value={locationSearch}
                onChangeText={setLocationSearch}
                onSubmitEditing={handleSearchQuery}
            />
        </View>

        <View style={styles.mapContainer}>
            <MapView 
                testID="map"
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
                      testID="marker"
                      coordinate={{
                              latitude: location.x,
                              longitude: location.y
                          }}
                    />
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
