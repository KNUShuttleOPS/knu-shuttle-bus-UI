import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";

import Splash from './src/screens/Splash';
import Login from './src/screens/Login';
import BusSchedule from './src/screens/BusSchedule';
import BusArrivalInfo from './src/screens/BusArrivalInfo';


const Stack = createStackNavigator();

function StackScreen() {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
    >
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="BusSchedule" component={BusSchedule} />
      <Stack.Screen name="BusArrivalInfo" component={BusArrivalInfo} />
    </Stack.Navigator>
  );
}

function Navigation() {
  return (
    <NavigationContainer>
      <StackScreen />
    </NavigationContainer>
  );
}

export default Navigation;