/* eslint-disable prettier/prettier */
import {del, get, postToken, put} from './services';

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
  postToken(body, '/register');
};

export const login_api = async (body = example.login) => {
  postToken(body, '/login');
};

export const update_user_api = async (body = example.update) => {
  put(body, '/profile');
};

export const get_profile_api = async () => {
  get('/profile');
};

export const del_repository_api = async () => {
  del('/repository/1');
};
