import {combineReducers} from 'redux';

import login, {actualizarLogin, logout} from './reducer/login';
import register, {actualizarRegister} from './reducer/register';
import navigation, {actualizarNavigation} from './reducer/navigation';
import format, {actualizarFormats, agregarFormat} from './reducer/format';
import selectImage, {actualizarImagenes} from './reducer/selectImagen';

import cart, {agregarCart, editarCart, setListCart} from './reducer/cart';
import layout, {actualizarLayout} from './reducer/layout';

export default combineReducers({
  login,
  register,
  navigation,
  format,
  selectImage,
  cart,
  layout,
});

export const actions = {
  actualizarLogin,
  actualizarRegister,
  actualizarNavigation,
  logout,
  actualizarFormats,
  agregarFormat,
  actualizarImagenes,
  agregarCart,
  editarCart,
  setListCart,
  actualizarLayout,
};
