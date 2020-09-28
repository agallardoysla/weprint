import {combineReducers} from 'redux';

import login, {actualizarLogin} from './reducer/login';
import register, {actualizarRegister} from './reducer/register';
import navigation, {actualizarNavigation} from './reducer/navigation';

export default combineReducers({
  login,
  register,
  navigation,
});

export const actions = {
  actualizarLogin,
  actualizarRegister,
  actualizarNavigation,
};
