import { createStore } from 'redux';
import authReducer from './authReducer';

const configureStore = () => {

  let defaultState = {
    isLoggedIn: false,
    username: undefined,
    displayName: undefined,
    image: undefined,
    password: undefined
  };

  const hoaxAuth = localStorage.getItem('hoax-auth');
  if (hoaxAuth) {
    try {
      defaultState = JSON.parse(hoaxAuth);
    } catch (err) { }
  }

  const store = createStore(authReducer, defaultState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  store.subscribe(() => {
    localStorage.setItem('hoax-auth', JSON.stringify(store.getState()));
  });

  return store;
}

export default configureStore;