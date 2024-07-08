import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ManualDrivingScreen from './screens/manualDrivingScreen.js';
import HomePage from './screens/homePage.js';
import BotDrivingView from './screens/botDrivingView.js';
import EndedRace from './screens/EndedRace';
import { WebSocketProvider } from './context/WebSocketContext.js';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <WebSocketProvider>
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
    </WebSocketProvider>
  );
}

