import React, { Component } from 'react';
import UserList from '../components/UserList';

class HomePage extends Component {
	render() {
		return (
			<div className="container">
				<UserList />
			</div>
		);
	}
}

export default HomePage;