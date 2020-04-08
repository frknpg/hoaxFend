import * as actions from './const';

const defaultState = {
	isLoggedIn: false,
	username: undefined,
	displayName: undefined,
	img: undefined,
	password: undefined
}

const authReducer = (state = { ...defaultState }, action) => {
	if (action.type === actions.LOGOUT_SUCCESS) {
		return defaultState;
	}

	if (action.type === actions.LOGIN_SUCCESS) {
		return {
			...state,
			...action.authState,
			isLoggedIn: true
		};
	}
	return state;
};

export default authReducer;