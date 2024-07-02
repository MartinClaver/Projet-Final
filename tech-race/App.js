import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ManualDrivingScreen from './screens/manualDrivingScreen.js';
import HomePage from './screens/homePage.js';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="HomePage"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="HomePage" component={HomePage} />
      <Stack.Screen name="Manual" component={ManualDrivingScreen} />
    </Stack.Navigator>
  </NavigationContainer>
  );
}