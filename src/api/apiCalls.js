import axios from 'axios';

export const changeLanguage = lang => {
  axios.defaults.headers['accept-language'] = lang;
}

export const login = creds => {
  return axios.post('/api/1.0/auth', {}, { auth: creds });
}

export const signUp = (body) => {
  return axios.post('/api/1.0/users', body);
}