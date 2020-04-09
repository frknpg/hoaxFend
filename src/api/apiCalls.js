import axios from 'axios';

export const changeLanguage = lang => {
  axios.defaults.headers['accept-language'] = lang;
};

export const setAuthorizationHeader = ({ username, password, isLoggedIn }) => {
  if (isLoggedIn) {
    const authHeaderValue = `Basic ${btoa(username + ':' + password)}`;
    axios.defaults.headers['Authorization'] = authHeaderValue;
  } else {
    delete axios.defaults.headers['Authorization'];
  }
};

export const login = creds => {
  return axios.post('/api/1.0/auth', {}, { auth: creds });
};

export const signUp = (body) => {
  return axios.post('/api/1.0/users', body);
};

export const getUsers = (page = 0, size = 3) => {
  return axios.get('/api/1.0/users', { params: { page, size } });
};

export const getUser = (username) => {
  return axios.get(`/api/1.0/users/${username}`);
};

