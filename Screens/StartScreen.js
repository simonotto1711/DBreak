import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

export default function StartScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>DBreak</Text>
      <Pressable style={styles.button} onPress={() => navigation.navigate('DrillSelect')}>
        <Text style={styles.buttonText}>Start Drill</Text>
      </Pressable>
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
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#1c1c1e',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
