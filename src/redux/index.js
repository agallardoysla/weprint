import {combineReducers} from 'redux';

import login, {actualizarLogin} from './reducer/login';
import register, {actualizarRegister} from './reducer/register';
import navigation, {actualizarNavigation} from './reducer/navigation';
import format, {actualizarFormats} from './reducer/format';

export default combineReducers({
  login,
  register,
  navigation,
  format,
});

export const actions = {
  actualizarLogin,
  actualizarRegister,
  actualizarNavigation,
  actualizarFormats,
};
