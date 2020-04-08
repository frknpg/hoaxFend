import { createStore } from 'redux';
import authReducer from './authReducer';
import SecureLS from 'secure-ls';

const secureLs = new SecureLS();

const getStateFromStorage = () => {
  let defaultState = {
    isLoggedIn: false,
    username: undefined,
    displayName: undefined,
    image: undefined,
    password: undefined
  };

  const hoaxAuth = secureLs.get('hoax-auth');
  if (hoaxAuth) {
    return hoaxAuth;
  }

  return defaultState;
};

const updateStateInStorage = (newState) => {
  secureLs.set('hoax-auth', newState);
};

const configureStore = () => {

  const store = createStore(authReducer, getStateFromStorage(),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  store.subscribe(() => {
    updateStateInStorage(store.getState());
  });

  return store;
}

export default configureStore;