import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet, Text, Alert, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import * as Linking from 'expo-linking';

const LocateButton = () => {
 const [savedLocation, setSavedLocation] = useState(null);

 useEffect(() => {
  const loadSavedLocation = async () => {
   try {
    const location = await AsyncStorage.getItem('savedLocation');
    if (location !== null) {
     setSavedLocation(JSON.parse(location));
    }
   } catch (error) {
    console.error('Failed to load saved location:', error);
   }
  };

  loadSavedLocation();
 }, []);

 const locateSpot = () => {
  if (savedLocation) {
   const url = `https://www.google.com/maps/search/?api=1&query=${savedLocation.latitude},${savedLocation.longitude}`;
   Linking.openURL(url);
  } else {
   Alert.alert('No spot saved', 'There is no saved location to display.');
  }
 };

 return (
  <View style={styles.container}>
   <Button title="Locate spot" onPress={locateSpot} />
  </View>
 );
};

const styles = StyleSheet.create({
 container: {
  marginVertical: 10,
  alignItems: 'center',
 },
});

export default LocateButton;
