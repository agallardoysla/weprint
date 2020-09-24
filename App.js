import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, View, Text, StatusBar} from 'react-native';

import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist'; //NO BORRAR

import Cargando from './src/generales/Cargando';
import Navigate from './src/Navigate';

import {store, persistor} from './src/redux/store';

const App: () => React$Node = () => {
  const renderLoading = () => (
    <View style={styles.container}>
      <Cargando />
    </View>
  );

  useEffect(() => {
    //limpiar persist
    persistStore(store).purge();
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
    backgroundColor: 'red',
  },
});
export default App;
