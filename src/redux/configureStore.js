import { createStore } from 'redux';
import authReducer from './authReducer';

const defaultState = {
  isLoggedIn: false,
  username: undefined,
  displayName: undefined,
  image: undefined,
  password: undefined
}

const configureStore = () => {

  return createStore(authReducer, defaultState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

}

export default configureStore;