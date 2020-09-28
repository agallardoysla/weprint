import {del, get, postToken, put} from './services';

export const getProvinces = async (body) => {
  return get('/province?country_id=1');
};

export const getDiscricts = async (id) => {
    console.log(`/province?country_id=${id}`)
  return get(`/district?province_id=${id}`);
};
