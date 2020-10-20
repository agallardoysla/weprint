/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import mime from "mime";

export const BEARER_TOKEN_NAME = 'bearer_token_api';
export const BASE_API = 'http://52.9.49.89';
export const BEARER_TOKEN = '';
export const HTTP_ERROR_INTERNET_LOST = 'http/no-internet';
export const HTTP_SERVER_UNAVAILABLE = 'http/server-unavailable';

import qs from 'query-string';

export const get = async (uri) => {
  var myHeaders = await getHeaders();

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  return fetch(`${BASE_API}${uri}`, requestOptions)
    .then((response) => response.json())
    .catch((error) => console.log('error', error));
};

export const put = async (uri, body) => {
  var myHeaders = await getHeaders();
  var raw = JSON.stringify(body);

  var requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  fetch(`${BASE_API}${uri}`, requestOptions)
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((error) => console.log('error', error));
};

export const del = async (uri) => {
  var myHeaders = await getHeaders();

  var requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
    redirect: 'follow',
  };

  fetch(`${BASE_API}${uri}`, requestOptions)
    .then((response) => response.json())
    .catch((error) => console.log('error', error));
};

export const postUpload = async (uri, body) => {
  let myHeaders = await getHeaders('form');

  body = body.file;

  const data = new FormData();
  data.append('file', {
    name: body.image.filename,
    type: body.type,
    uri:
      Platform.OS === 'android'
        ? body.image.uri
        : body.image.uri.replace('file://', ''),
  });
  data.append('folder', 'user');

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: data,
    redirect: 'follow',
  };

  return fetch(`${BASE_API}${uri}`, requestOptions)
    .then((response) => {
      console.log('postUpload response', response);
      return response.text();
    })
    .then((result) => {
      return result;
    })
    .catch((error) => console.log('error', error));
};

export const post = async (uri, body) => {
  var myHeaders = await getHeaders();

  var raw = JSON.stringify(body);
  
  console.log(raw)

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  return fetch(`${BASE_API}${uri}`, requestOptions)
    .then(async(response) => await response.json())
    .catch((error) => console.log('error', error));
};

export const postToken = async (body, uri) => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  var raw = JSON.stringify(body);

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  return fetch(`${BASE_API}${uri}`, requestOptions)
    .then((response) => response.json())
    .then(async (result) => {
      if (result.success) {
        let {token} = result?.data[0];
        token != undefined && (await setAuthorization(token));
      }
      return result;
    })
    .catch((error) => console.log('error', error));
};

export const isJson = (str) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

export const setAuthorization = (authorization) => {
  try {
    console.log('setting header', authorization);
    AsyncStorage.setItem(BEARER_TOKEN_NAME, authorization);
  } catch (e) {
    console.log('Error saving token', authorization);
  }
};

export const getAuthorization = () => {
  try {
    return AsyncStorage.getItem(BEARER_TOKEN_NAME);
  } catch (e) {
    console.log('Error reading local token:', e);
  }

  return null;
};

export const getHeaders = async (form) => {
  let token = await getAuthorization();

  var myHeaders = new Headers();

  myHeaders.append('Authorization', `Bearer ${token}`);
  form === 'form'
    ? myHeaders.append('Content-Type', 'multipart/form-data')
    : myHeaders.append('Content-Type', 'application/json');

  return myHeaders;
};
