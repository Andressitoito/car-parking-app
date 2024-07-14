import React, { useState } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SaveButton = ({ onSaveComplete }) => {
 const [showAlert, setShowAlert] = useState(false);

 const saveLocation = async () => {
  console.log("saving location ");
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
   alert('Permission to access location was denied');
   return;
  }

  let currentLocation = await Location.getCurrentPositionAsync({});
  console.log("Current location: ", currentLocation.coords);

  // Save location to local storage
  await AsyncStorage.setItem('savedLocation', JSON.stringify(currentLocation.coords));

  onSaveComplete(currentLocation.coords);

  // Show the alert for 2 seconds
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
  margin: 10,
 },
 alert: {
  marginTop: 10,
  padding: 10,
  backgroundColor: 'green',
  borderRadius: 5,
 },
 alertText: {
  color: 'white',
  fontWeight: 'bold',
  textAlign: 'center',
 },
});

export default SaveButton;
