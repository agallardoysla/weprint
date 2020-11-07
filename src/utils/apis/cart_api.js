import {get, post, put} from './services';

export const get_albums_api = async () => get('/cart');

export const get_albums_request = async () => get('/cart-shared');

export const accept_shared_album = async (shared_id) =>
  post('/cart-shared/accepted', shared_id);

export const create_cart = async (body) => post('/cart', body);
export const update_cart = async (body, cartId) => put(`/cart/${cartId}`, body);
