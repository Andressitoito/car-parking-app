// components/LoadingBar.js
import React, { useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

const LoadingBar = ({ onComplete }) => {
 const progress = new Animated.Value(0);

 useEffect(() => {
  console.log("starting animation ")
  Animated.timing(progress, {
   toValue: 1,
   duration: 3000, // 3 seconds
   useNativeDriver: false,
  }).start(() => {
   onComplete();
  });
  console.log("ending animation ")
 }, [progress, onComplete]);

 const widthInterpolated = progress.interpolate({
  inputRange: [0, 1],
  outputRange: ['0%', '100%'],
 });

 return (
  <View style={styles.container}>
   <Animated.View style={[styles.bar, { width: widthInterpolated }]} />
  </View>
 );
};

const styles = StyleSheet.create({
 container: {
  width: '100%',
  height: 10,
  backgroundColor: '#e0e0e0',
  borderRadius: 5,
  overflow: 'hidden',
  marginTop: 10,
 },
 bar: {
  height: '100%',
  backgroundColor: 'green',
 },
});

export default LoadingBar;
