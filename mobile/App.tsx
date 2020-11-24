import { Roboto_400Regular, Roboto_500Medium } from '@expo-google-fonts/roboto';
import { Ubuntu_700Bold, useFonts } from '@expo-google-fonts/ubuntu';
import { AppLoading } from 'expo';
import React from 'react';
import { Provider } from 'react-redux';
import { StatusBar } from 'react-native';

import store from './src/store';

// import './src/config/ReactotronConfig';

import Routes from './src/routes';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Ubuntu_700Bold
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <Provider store={store}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#f0f0f5"
        translucent
      />
      <Routes />
    </Provider>
  );
}
