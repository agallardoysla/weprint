import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  Alert,
} from 'react-native';

import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist'; //NO BORRAR
import Navigate from './src/Navigate';

import {store, persistor} from './src/redux/store';
import CargandoModal from './src/generales/CargandoModal';

import messaging from '@react-native-firebase/messaging';

import AsyncStorage from '@react-native-community/async-storage';
import './src/i18n';

const App: () => React$Node = () => {
  const renderLoading = () => (
    <View style={styles.container}>
      <CargandoModal transparentBackground={false} />
    </View>
  );

  useEffect(() => {
    //limpiar persist
    //persistStore(store).purge();
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      Alert.alert('Push notify', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={renderLoading()}>
          <Navigate />
        </PersistGate>
      </Provider>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
});
export default App;
