import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import SaveButton from '../components/SaveButton';
import LocateButton from '../components/LocateButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {
 const [location, setLocation] = useState(null);

 useEffect(() => {
  const loadSavedLocation = async () => {
   const savedLocation = await AsyncStorage.getItem('savedLocation');
   if (savedLocation) {
    setLocation(JSON.parse(savedLocation));
   }
  };
  
  loadSavedLocation();
 }, []);

 const handleSaveComplete = (coords) => {
  setLocation(coords);
 };
 
 // Use location.latitude and location.longitude in key to trigger map reload
 const mapKey = location ? `${location.latitude}_${location.longitude}` : null;

 return (
  <View style={styles.container}>
     <SaveButton onSaveComplete={handleSaveComplete} />
   <LocateButton location={location} />
   {location ? (
    <MapView
     key={mapKey} // Use key prop to force re-render of MapView
     provider={PROVIDER_GOOGLE} // Make sure Google Maps is configured correctly
     style={styles.map}
     initialRegion={{
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0.002,
      longitudeDelta: 0.002,
     }}
    >
     <Marker
      coordinate={{ latitude: location.latitude, longitude: location.longitude }}
     />
    </MapView>
   ) : (
    <View style={styles.noLocation}>
     <Text style={styles.noLocationText}>No location saved</Text>
    </View>
   )}
  </View>
 );
};

const styles = StyleSheet.create({
 container: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  padding: 20,
  backgroundColor: '#333',
 },
 map: {
  width: 300,
  height: 300,
  marginTop: 20,
 },
 noLocation: {
  width: 300,
  height: 300,
  marginTop: 20,
  backgroundColor: '#ccc',
  justifyContent: 'center',
  alignItems: 'center',
 },
 noLocationText: {
  color: '#666',
 },
});

export default HomeScreen;
