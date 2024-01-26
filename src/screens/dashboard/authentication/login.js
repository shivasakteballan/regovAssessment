import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  Button,
  Dimensions,
  SafeAreaView,
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
    //   const currentUrl = externalPopup?.location?.href;
    //   if (currentUrl === url) {
    //     return;
    //   } else {
        try {
          await createAccessToken(requestToken);
        } catch (error) {
          console.log(error);
        } finally {
            setUrl(null);
          timer && clearInterval(timer);
        }
    //   }
    }, 3000);
    // eslint-disable-next-line
  }, [url, requestToken]);

  const handleSubmit = e => {
    e.preventDefault();
    setEmail('');
    setPassword('');
  };

  // ...
  const MyWebComponent = url => {
    console.log('line 53', url);
    return (
      <View style={{flex: 1}}>
        <WebView
          source={{uri: url}}
          style={{flex: 1, height: height, width: width}}
        />
      </View>
    );
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
          console.log('line 68', response?.request_token);
          setRequestToken(response?.request_token);
          const url = `https://www.themoviedb.org/auth/access?request_token=${response?.request_token}`;
        //   MyWebComponent(url);
          //   const popup = window.open(url);
          //   setExternalPopup(popup);
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
      <Text style={{textAlign: 'center'}}>Regov Technologies</Text>
      <Text style={{textAlign: 'center'}}>Sign In</Text>
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
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </View>
          {/* <br /> */}
          <View>
            <Text>Password:</Text>
            <TextInput
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </View>
          {/* <br /> */}
          <View>
            {/* <Button type="submit">Sign In</Button> */}
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
