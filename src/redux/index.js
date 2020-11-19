import {combineReducers} from 'redux';

import login, {actualizarLogin, logout} from './reducer/login';
import register, {actualizarRegister} from './reducer/register';
import navigation, {actualizarNavigation} from './reducer/navigation';
import format, {actualizarFormats, agregarFormat} from './reducer/format';
import profile, {actualizarProfile} from './reducer/profile';

import cart, {
  agregarCart,
  editarCart,
  setListCart,
  cartHasLocalChange,
} from './reducer/cart';
import layout, {actualizarLayout} from './reducer/layout';

export default combineReducers({
  login,
  register,
  navigation,
  format,
  cart,
  layout,
  profile,
});

export const actions = {
  actualizarLogin,
  actualizarRegister,
  actualizarNavigation,
  logout,
  actualizarProfile,
  actualizarFormats,
  agregarFormat,
  agregarCart,
  editarCart,
  setListCart,
  cartHasLocalChange,
  actualizarLayout,
};
