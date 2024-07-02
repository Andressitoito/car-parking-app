// screens/HomeScreen.js
import React, { useState } from 'react';
import { View, Button, StyleSheet, Image, Alert, Text, Linking } from 'react-native';
import * as Location from 'expo-location';
import LoadingBar from '../components/LoadingBar';

const HomeScreen = () => {
 const [location, setLocation] = useState(null);
 const [isSaving, setIsSaving] = useState(false);
 const [showLoadingBar, setShowLoadingBar] = useState(false);

 const saveLocation = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
   Alert.alert('Permission to access location was denied');
   return;
  }

  let currentLocation = await Location.getCurrentPositionAsync({});
  setLocation(currentLocation.coords);
  setShowLoadingBar(true);
 };

 const onLoadingComplete = () => {
  setShowLoadingBar(false);
  setIsSaving(false);
 };

 const locateSpot = () => {
  if (!location) {
   Alert.alert('No spot saved');
   return;
  }

  const { latitude, longitude } = location;
  const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
  Linking.openURL(url);
 };

 return (
  <View style={styles.container}>
   {showLoadingBar && <LoadingBar onComplete={onLoadingComplete} />}
   <Button title="Save location" onPress={saveLocation} />
   <Button title="Locate spot" onPress={locateSpot} />
   {location ? (
    <Image
     style={styles.image}
     source={{ uri: `https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=15&size=400x400&key=YOUR_API_KEY` }}
    />
   ) : (
    <Text>No location saved</Text>
   )}
  </View>
 );
};

const styles = StyleSheet.create({
 container: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
 },
 image: {
  width: 300,
  height: 300,
  marginTop: 20,
 },
});

export default HomeScreen;
