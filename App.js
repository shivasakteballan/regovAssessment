import * as React from 'react';
import {Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector, useDispatch} from 'react-redux';

import Login from './src/screens/dashboard/authentication/login';
import Dashboard from './src/screens/dashboard';
import MovieDetails from './src/screens/dashboard/movieDetails/movieDetails';
import {savingToken, savingAccessToken} from './src/feature/auth/tokenSlice';

const Stack = createNativeStackNavigator();

function App() {
  const user = useSelector(state => state.counter.value);

  const accessToken = useSelector(state => state?.counter?.accessToken);
  const dispatch = useDispatch();

  const logout = () => {
    const options = {
      method: 'DELETE',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNDJhZWE2OTU3NjFhYjVkZjU1MDNhMjVlNDA3YzVlZSIsInN1YiI6IjY1YTA5YzM0MmNlZmMyMDEzMTM3NDZmZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qHbjeaQ9_qLHw36tXTj6aQGs-MWspj2v8ZW3XlM0SKI',
      },
      body: JSON.stringify({
        access_token: accessToken,
      }),
    };

    fetch('https://api.themoviedb.org/4/auth/access_token', options)
      .then(response => response.json())
      .then(response => {
        dispatch(savingToken(null));
        dispatch(savingAccessToken(null));
      })
      .catch(err => console.error(err));
  };

  return !user ? (
    <Login />
  ) : (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            headerRight: () => (
              <Button onPress={() => logout()} title="Signout" />
            ),
          }}
        />
        <Stack.Screen
          name="MovieDetails"
          component={MovieDetails}
          options={{
            title: "Movie Details",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
