import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import LoginStudentScreen from './src/screens/LoginStudentScreen';
import LoginDriverScreen from './src/screens/LoginDriverScreen';
import StartDriveBus from './src/screens/StartDriveBus';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="StudentLogin" component={LoginStudentScreen} />
        <Stack.Screen name="DriverLogin" component={LoginDriverScreen} />
        <Stack.Screen name="DriveBus" component={StartDriveBus} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
