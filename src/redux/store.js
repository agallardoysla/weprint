import AsyncStorage from '@react-native-community/async-storage';
import { applyMiddleware, createStore, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';

import rootReducer from './';

const persistConfig = {
	key: 'root2',
	keyPrefix: '',
	storage: AsyncStorage,
	whitelist: ['login'],
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
	undefined
	//composeWithDevTools(applyMiddleware(...middlewares))
);

export const persistor = persistStore(store);
