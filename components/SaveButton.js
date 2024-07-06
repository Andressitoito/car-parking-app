import React, { useState } from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';

const SaveButton = ({ onSaveComplete }) => {
 const [isSaving, setIsSaving] = useState(false);
 const [showAlert, setShowAlert] = useState(false);

 const saveLocation = async () => {
  console.log("saving location ");
  let { status } = await Location.requestForegroundPermissionsAsync();

  if (status !== 'granted') {
   alert('Permission to access location was denied');
   return;
  }

  let currentLocation = await Location.getCurrentPositionAsync({});
  console.log("is saving true ");
  setIsSaving(true);

  try {
   await AsyncStorage.setItem('savedLocation', JSON.stringify(currentLocation.coords));
   console.log("coords ", currentLocation.coords)
   console.log("coords ", currentLocation)
   onSaveComplete(currentLocation.coords);
  } catch (error) {
   console.error('Failed to save location:', error);
  }

  setIsSaving(false);
  console.log("is saving false");
  setShowAlert(true);
  setTimeout(() => {
   setShowAlert(false);
  }, 2000);
 };

 return (
  <View style={styles.container}>
   <Button title="Save location" onPress={saveLocation} />
   {showAlert && (
    <View style={styles.alert}>
     <Text style={styles.alertText}>Spot saved</Text>
    </View>
   )}
  </View>
 );
};

const styles = StyleSheet.create({
 container: {
  marginVertical: 10,
  alignItems: 'center',
 },
 alert: {
  position: 'absolute',
  bottom: 50,
  backgroundColor: 'green',
  padding: 10,
  borderRadius: 5,
 },
 alertText: {
  color: 'white',
  fontSize: 16,
 },
});

export default SaveButton;
