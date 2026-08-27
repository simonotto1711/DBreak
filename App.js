import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StartScreen from './Screens/StartScreen';
import DrillSelectScreen from './Screens/DrillSelectScreen';
import DrillRunScreen from './Screens/DrillRunScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start" screenOptions={{headerShown: false}}>
        <Stack.Screen name="Start" component={StartScreen} />
        <Stack.Screen name="DrillSelect" component={DrillSelectScreen} />
        <Stack.Screen name="DrillRun" component={DrillRunScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
