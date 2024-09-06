import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from './screens/HomePage.js';
import EndedRace from './screens/EndedRace';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BotDrivingView from './screens/BotDrivingView.js';
import ManualDrivingScreen from './screens/ManualDrivingScreen.js';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView >
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="HomePage"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="HomePage" component={HomePage} />
          <Stack.Screen name="Manual" component={ManualDrivingScreen} />
          <Stack.Screen name="BotView" component={BotDrivingView} />
          <Stack.Screen name="EndedRace" component={EndedRace} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

