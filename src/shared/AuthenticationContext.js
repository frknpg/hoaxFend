import React, { Component } from 'react';

export const Authentication = React.createContext();

class AuthenticationContext extends Component {

	state = {
		isLoggedIn: false,
		username: undefined,
		displayName: undefined,
		img: undefined,
		password: undefined
	};

	onLoginSuccess = (authState) => {
		this.setState({
			...authState,
			isLoggedIn: true
		});
	}

	onLogout = () => {
		this.setState({ isLoggedIn: false, username: '' });
	}

	render() {
		return (
			<Authentication.Provider value={{ state: { ...this.state }, onLoginSuccess: this.onLoginSuccess, onLogout: this.onLogout }}>
				{this.props.children}
			</Authentication.Provider>
		);
	}
}

export default AuthenticationContext;