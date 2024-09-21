import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from 'react-native';

import Home from './src/screens/Home';
import LoginDriver from './src/screens/LoginDriver';
import LoginStudent from './src/screens/LoginStudent';
import BusSchedule from './src/screens/BusSchedule';
import BusArrivalInfo from './src/screens/BusArrivalInfo';
import SelectDriveBus from './src/screens/SelectDriveBus';
import StartDriveBus from './src/screens/StartDriveBus';
import SelectBusStation from './src/screens/SelectBusStation';
import RTBusLocationMap from './src/screens/RTBusLocationMap';

const Stack = createStackNavigator();

function StackScreen() {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="LoginDriver" component={LoginDriver} />
      <Stack.Screen name="LoginStudent" component={LoginStudent} />
      <Stack.Screen name="BusSchedule" component={BusSchedule} />
      <Stack.Screen name="BusArrivalInfo" component={BusArrivalInfo} />
      <Stack.Screen name="SelectStation" component={SelectBusStation} />
      <Stack.Screen name="SelectBus" component={SelectDriveBus} />
      <Stack.Screen name="DriveBus" component={StartDriveBus} />
      <Stack.Screen name="RTBusLocationMap" component={RTBusLocationMap} />
    </Stack.Navigator>
  );
}

function Navigation() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <StackScreen />
    </NavigationContainer>
  );
}

export default Navigation;
