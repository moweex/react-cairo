import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  HomeScreen,
  CodeScanScreen,
  ManualCheckInScreen,
  UserScreen,
} from './src/screens';
import { ConfigServerState } from './src/config';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ConfigServerState>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Check In Attendee" component={CodeScanScreen} />
          <Stack.Screen
            name="Manual Check In"
            component={ManualCheckInScreen}
          />
          <Stack.Screen name="User" component={UserScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ConfigServerState>
  );
}
