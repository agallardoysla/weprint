import {get, post} from './services';

export const get_albums_api = async () => get('/cart');

export const get_albums_request = async () => get('/cart-shared');

export const accept_shared_album = async (shared_id) =>
  post('/cart-shared/accepted', shared_id);
