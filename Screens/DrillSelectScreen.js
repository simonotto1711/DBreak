import React from 'react';
import { View, Text, StyleSheet, Pressable, FlatList } from 'react-native';

const DRILLS = [
  { id: 'w', name: 'W-Drill' },
  { id: 't', name: 'T-Drill' },
];

export default function DrillSelectScreen({ navigation }) {
  const renderItem = ({ item }) => (
    <Pressable
      style={styles.drillButton}
      onPress={() => navigation.navigate('DrillRun', { drill: item })}
    >
      <Text style={styles.drillText}>{item.name}</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Drill</Text>
      <FlatList
        data={DRILLS}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f7',
    paddingTop: 80,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  list: {
    width: '100%',
    paddingHorizontal: 20,
  },
  drillButton: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
  },
  drillText: {
    fontSize: 18,
    fontWeight: '500',
  },
});
