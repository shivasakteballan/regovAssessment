import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Dimensions,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {savingToken, savingAccessToken} from '../../../feature/auth/tokenSlice';

import {WebView} from 'react-native-webview';

const {height, width} = Dimensions.get('window');

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [requestToken, setRequestToken] = useState(null);
  const [externalPopup, setExternalPopup] = useState(null);
  const [url, setUrl] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!url) {
      return;
    }
    const timer = setInterval(async () => {
      if (!url) {
        timer && clearInterval(timer);
        return;
      }
        try {
          await createAccessToken(requestToken);
        } catch (error) {
          console.log(error);
        } finally {
            setUrl(null);
          timer && clearInterval(timer);
        }
    }, 3000);
    // eslint-disable-next-line
  }, [url, requestToken]);

  const handleSubmit = e => {
    e.preventDefault();
    setEmail('');
    setPassword('');
  };

  const createRequestToken = async () => {
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNDJhZWE2OTU3NjFhYjVkZjU1MDNhMjVlNDA3YzVlZSIsInN1YiI6IjY1YTA5YzM0MmNlZmMyMDEzMTM3NDZmZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qHbjeaQ9_qLHw36tXTj6aQGs-MWspj2v8ZW3XlM0SKI',
      },
    };
    try {
      fetch('https://api.themoviedb.org/4/auth/request_token', options)
        .then(response => response.json())
        .then(async response => {
          setRequestToken(response?.request_token);
          const url = `https://www.themoviedb.org/auth/access?request_token=${response?.request_token}`;
          setUrl(url);
        })
        .catch(err => console.error(err));
    } catch {}
  };

  const createAccessToken = async requestToken => {
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNDJhZWE2OTU3NjFhYjVkZjU1MDNhMjVlNDA3YzVlZSIsInN1YiI6IjY1YTA5YzM0MmNlZmMyMDEzMTM3NDZmZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qHbjeaQ9_qLHw36tXTj6aQGs-MWspj2v8ZW3XlM0SKI',
      },
      body: JSON.stringify({
        request_token: requestToken,
      }),
    };

    await fetch('https://api.themoviedb.org/4/auth/access_token', options)
      .then(response => response.json())
      .then(response => {
        console.log(response);
        dispatch(savingToken(response?.account_id));
        dispatch(savingAccessToken(response?.access_token));
      })
      .catch(err => console.error(err));
  };

  const theMovieDBSignIn = async () => {
    await createRequestToken();
  };

  return url ? (
    <View style={{flex: 1}}>
        <WebView
          source={{uri: url}}
          style={{flex: 1, height: height, width: width}}
        />
      </View>
  ) : (
    <View style={{flex: 1}}>
      <Text style={{ textAlign: 'center', fontSize: 18, marginTop: 10 }}>Regov Technologies</Text>
      <Text style={{textAlign: 'center', fontSize: 15, marginTop: 10 }}>Sign In</Text>
      <View
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View onSubmit={handleSubmit}>
          <View>
            <Text>Email:</Text>
            <TextInput
              style={{ borderWidth: 1, height: 40 }}
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </View>
          <View>
            <Text>Password:</Text>
            <TextInput
              style={{ borderWidth: 1, height: 40 }}
              secureTextEntry={true}
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </View>
          <View
          style={{ marginTop: 10, flexDirection: 'row', alignContent: 'space-between' }}
          >
            <Button
            title="Sign In" />
            <Button
              onPress={theMovieDBSignIn}
              title="Sign In with themoviedb"
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Login;
