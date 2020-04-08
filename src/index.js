import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './container/App';
import * as serviceWorker from './serviceWorker';
import './bootstrap-override.scss';
import './i18n';
import AuthenticationContext from './shared/AuthenticationContext';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Switch } from 'react-router-dom';

const loggedInState = {
	isLoggedIn: true,
	username: 'user1',
	displayName: 'user1',
	img: undefined,
	password: 'P4ssword'
}

const defaultState = {
	isLoggedIn: false,
	username: undefined,
	displayName: undefined,
	img: undefined,
	password: undefined
}

const reducer = (state = { ...defaultState }, action) => {
	if (action.type === 'LOGOUT_SUCCESS') {
		return defaultState;
	}
	return state;
}

const store = createStore(reducer, loggedInState);

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
