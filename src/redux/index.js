import {combineReducers} from 'redux';

import login, {actualizarLogin} from './reducer/login';
import navigation, {actualizarNavigation} from './reducer/navigation';

export default combineReducers({
  login,
  navigation,
});

export const actions = {
  actualizarLogin,
  actualizarNavigation,
};
