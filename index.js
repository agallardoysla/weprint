/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

if (typeof HermesInternal === 'undefined') {
  console.log('Hermes is not enabled');
} else {
  console.log('Hermes is enabled');
}

AppRegistry.registerComponent(appName, () => App);
