import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';

import Login from './src/screens/dashboard/authentication/login';
import Dashboard from './src/screens/dashboard';

const Stack = createNativeStackNavigator();

function App() {
  const user = useSelector((state) => state.counter.value)

  return !user ? (
    <Login />
  ) : (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen name="Login" component={Login} /> */}
        <Stack.Screen name="Dashboard" component={Dashboard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
