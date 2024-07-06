// screens/HomeScreen.js
import React, { useState } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import SaveButton from '../components/SaveButton';
import LocateButton from '../components/LocateButton';

const HomeScreen = () => {
 const [location, setLocation] = useState(null);

 const handleSaveComplete = (coords) => {
  setLocation(coords);
 };

 return (
  <View style={styles.container}>
   <SaveButton onSaveComplete={handleSaveComplete} />
   <LocateButton location={location} />
   {/* {location ? (
    <Image
     style={styles.image}
     source={{ uri: `https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=15&size=400x400&key=YOUR_API_KEY` }}
    />
   ) : (
    <Text>No location saved</Text>
   )} */}
  </View>
 );
};

const styles = StyleSheet.create({
 container: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  padding: 20,
 },
 image: {
  width: 300,
  height: 300,
  marginTop: 20,
 },
});

export default HomeScreen;
