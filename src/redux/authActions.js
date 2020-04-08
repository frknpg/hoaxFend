import * as actions from './const';

export const onLogout = () => ({
	type: actions.LOGOUT_SUCCESS
});

export const onloginSuccess = (authState) => ({
	type: actions.LOGIN_SUCCESS,
	authState
});