// components/LoadingBar.js
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

const LoadingBar = ({ onComplete }) => {
 const [progress, setProgress] = useState(new Animated.Value(0));

 useEffect(() => {
  Animated.timing(progress, {
   toValue: 1,
   duration: 3000,
   useNativeDriver: false,
  }).start(() => {
   onComplete();
  });
 }, []);

 return (
  <View style={styles.container}>
   <Animated.View
    style={[
     styles.loadingBar,
     {
      width: progress.interpolate({
       inputRange: [0, 1],
       outputRange: ['0%', '100%'],
      })
     },
    ]}
   />
  </View>
 );
};

const styles = StyleSheet.create({
 container: {
  width: '100%',
  height: 10,
  backgroundColor: '#ccc',
  borderRadius: 5,
  overflow: 'hidden',
 },
 loadingBar: {
  height: '100%',
  backgroundColor: 'green',
 },
});

export default LoadingBar;
