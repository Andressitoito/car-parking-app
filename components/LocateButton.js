import React from 'react';
import { View, Button, Alert, Linking, Text, StyleSheet } from 'react-native';

const LocateButton = ({ location }) => {
  const locateSavedSpot = () => {
    if (location) {
      const { latitude, longitude } = location;
      const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
      Linking.openURL(url);
    } else {
      Alert.alert('No spot saved', 'Please save a location first.');
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Locate spot" onPress={locateSavedSpot} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
});

export default LocateButton;
