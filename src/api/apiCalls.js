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

export const updateUser = (username, body) => {
  return axios.put(`/api/1.0/users/${username}`, body);
};

export const postHoax = (hoax) => {
  return axios.post('/api/1.0/hoaxes', hoax);
};

export const getHoaxes = (username, page = 0) => {
  const path = username ? `/api/1.0/users/${username}/hoaxes` : '/api/1.0/hoaxes';
  return axios.get(path, { params: { page } });
};

export const getOldHoaxes = (username, id) => {
  const path = username ? `/api/1.0/users/${username}/hoaxes/${id}` : `/api/1.0/hoaxes/${id}`;
  return axios.get(path);
};

export const getNewHoaxCount = (username, id) => {
  const path = username ? `/api/1.0/users/${username}/hoaxes/${id}` : `/api/1.0/hoaxes/${id}`;
  return axios.get(path, { params: { count: true }});
};

export const getNewHoaxes = (username, id) => {
  const path = username ? `/api/1.0/users/${username}/hoaxes/${id}` : `/api/1.0/hoaxes/${id}`;
  return axios.get(path, { params: { direction: 'after' }});
};

export const postHoaxAttachment = (attachment) => {
  return axios.post(`/api/1.0/hoax-attachments`, attachment);
};

export const deleteHoax = (id) => {
  return axios.delete(`/api/1.0/hoaxes/${id}`);
};