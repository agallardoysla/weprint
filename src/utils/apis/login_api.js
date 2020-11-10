import {get, postToken, put, post} from './services';

const example = {
  register: {
    district_id: 23,
    nickname: '121',
    firstname: 'Jorge',
    lastname: 'Carreño',
    email: '121@latadigital.cl',
    password: '1234',
    address: 'aasdf',
    birthdate: '1985-05-28',
  },
  login: {
    email: 'jorge2223@latadigital.cl',
    password: '1234',
  },
  update: {
    district_id: 23,
    nickname: '121',
    firstname: 'Jorge',
    lastname: 'Carreño',
    email: '121@latadigital.cl',
    password: '1234',
    address: 'aasdf',
    birthdate: '1985-05-28',
  },
};

export const register_api = async (body) => {
  return postToken(body, '/register');
};

export const login_api = async (body) => {
  return postToken(body, '/login');
};

export const update_user_api = async (body) => {
  return put('/profile', body);
};

export const get_profile_api = async () => {
  return get('/profile');
};

export const remember_password_api = async (body) => {
  return post('/remember-password', body);
};
