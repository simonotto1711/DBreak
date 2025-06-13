import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';

export default function SignalEffect({ trigger }) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (trigger) {
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.8,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        })
      ]).start();
    }
  }, [trigger]);

  return <Animated.View pointerEvents="none" style={[styles.flash, {opacity}]} />;
}

const styles = StyleSheet.create({
  flash: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#ffd60a',
  },
});
