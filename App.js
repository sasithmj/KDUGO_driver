import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomePage from './src/screens/HomePage';
import TrackingPage from './src/screens/TrackingPage';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomePage}
          options={{title: 'Bus Tracking App'}}
        />
        <Stack.Screen
          name="Tracking"
          component={TrackingPage}
          options={{title: 'Active Tracking'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
