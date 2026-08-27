import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import SignalEffect from '../Components/SignalEffect';

const BREAK_COUNT = 5;
const BREAK_INTERVAL = 1500; // milliseconds

export default function DrillRunScreen({ route, navigation }) {
  const { drill } = route.params || {};
  const [currentBreak, setCurrentBreak] = useState(0);
  const [flash, setFlash] = useState(false);
  const intervalRef = useRef(null);
  const soundRef = useRef();

  useEffect(() => {
    let isMounted = true;

    async function loadSound() {
      const { sound } = await Audio.Sound.createAsync(
        require('../Assets/sound/beep.mp3')
      );
      if (isMounted) {
        soundRef.current = sound;
      } else {
        await sound.unloadAsync();
      }
    }

    loadSound();
    return () => {
      isMounted = false;
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, []);

  useEffect(() => {
    intervalRef.current = setInterval(async () => {
      if (soundRef.current) {
        await soundRef.current.replayAsync();
      }
      setFlash((f) => !f);
      setCurrentBreak((count) => {
        const nextCount = count + 1;

        if (nextCount >= BREAK_COUNT) {
          clearInterval(intervalRef.current);
        }

        return Math.min(nextCount, BREAK_COUNT);
      });
    }, BREAK_INTERVAL);

    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{drill?.name || 'Drill'}</Text>
      <Text style={styles.counter}>{currentBreak}/{BREAK_COUNT}</Text>
      <SignalEffect trigger={flash} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f7',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  counter: {
    fontSize: 22,
    fontWeight: '600',
  },
});
