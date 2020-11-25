import {get} from './services';

export const getProvinces = async () => {
  return get('/province?country_id=1');
};

export const getDiscricts = async (id) => {
  return get(`/district?province_id=${id}`);
};
