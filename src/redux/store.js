import AsyncStorage from '@react-native-community/async-storage';
import {applyMiddleware, createStore, compose} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import {CERRAR_SESION} from './reducer/login';

import appReducer from './';

const rootReducer = (state, action) => {
  if (action.type === CERRAR_SESION) {
    state = undefined;
  }

  return appReducer(state, action);
};

const persistConfig = {
  key: 'root2',
  keyPrefix: '',
  storage: AsyncStorage,
  whitelist: ['login', 'register'],
  /*
	blacklist: [
		'productos',
	  ],
	  */
};
/*
const middlewares = [];

if (__DEV__) {
  middlewares.push(createLogger());
}
*/
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  undefined,
  //composeWithDevTools(applyMiddleware(...middlewares))
);

export const persistor = persistStore(store);
