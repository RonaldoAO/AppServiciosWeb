import { View, Text, Dimensions, PermissionsAndroid } from 'react-native'
import React, { useState, useRef, useCallback, useEffect, useContext } from 'react'
import * as Location from 'expo-location';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { UserLocationContext } from '../Context/UserLocationContext';


export default function GoogleMapView() {

  const [mapRegion, setMapRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0322,//Estas dos lineas son para el zoom
    longitudeDelta: 0.0421,
  });

  const { location, setLocation } = useContext(UserLocationContext);
  console.log('useContext', location);
  useEffect(() => {
    if (location) {
      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0322,//Estas dos lineas son para el zoom
        longitudeDelta: 0.0421,
      })
    }
  }, [location]);
  return (
    <View style={{padding:20}}>
      <View style={{ borderRadius: 20, overflow: 'hidden' }}>
        <MapView
          style={{
            width: Dimensions.get('screen').width * 0.9,
            height: Dimensions.get('screen').height * 0.23
          }}
          provider={PROVIDER_GOOGLE}
          showsMyLocationButton={true}
          showsUserLocation={true}
          region={mapRegion}
        >
          	
        {/* Marcador */}
        
        <Marker
          coordinate={mapRegion}
          title="Mi ubicación"
          description="Estoy aquí"/>
        </MapView>
      </View>
    </View>
  )
}