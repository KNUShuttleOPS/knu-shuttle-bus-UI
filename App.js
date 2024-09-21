import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native'; // StatusBar 추가
import HomeScreen from './src/screens/HomeScreen';
import LoginStudentScreen from './src/screens/LoginStudentScreen';
import LoginDriverScreen from './src/screens/LoginDriverScreen';
import SelectDriveBus from './src/screens/SelectDriveBus';
import StartDriveBus from './src/screens/StartDriveBus';
import SelectBusStation from './src/screens/SelectBusStation';
import BusOperationInfoDisplay from './src/screens/BusOperationInfoDisplay';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/* StatusBar 설정: 기본값을 사용해 상태 표시줄을 표시 */}
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" /> 

      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="StudentLogin" component={LoginStudentScreen} />
        <Stack.Screen name="SelectStation" component={SelectBusStation} />
        <Stack.Screen name="OperationDisplay" component={BusOperationInfoDisplay} />
        <Stack.Screen name="DriverLogin" component={LoginDriverScreen} />
        <Stack.Screen name="SelectBus" component={SelectDriveBus} />
        <Stack.Screen name="DriveBus" component={StartDriveBus} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
