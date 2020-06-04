import * as actions from './const';
import { login, signUp } from '../api/apiCalls';

export const onLogout = () => ({
	type: actions.LOGOUT_SUCCESS
});

export const onLoginSuccess = (authState) => ({
	type: actions.LOGIN_SUCCESS,
	authState
});

export const loginHandler = (credentials) => {
	return async function (dispatch) {
		const response = await login(credentials);

		const authState = { ...response.data, password: credentials.password };
		dispatch(onLoginSuccess(authState));
		return response;
	}
};

export const signupHandler = (user) => {
	return async function (dispatch) {
		const response = await signUp(user);

		await dispatch(loginHandler(user));
		return response;
	}
};

export const updateSuccess = ({ displayName, image }) => ({
	type: actions.UPDATE_SUCCESS,
	data: { displayName, image }
});