// components/LocateButton.js
import React from 'react';
import { View, Button, StyleSheet, Alert, Linking } from 'react-native';

const LocateButton = ({ location }) => {
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
