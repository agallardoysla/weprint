import {get} from './services';

export const get_layout_api = async () => {
  return get('/layout');
};
