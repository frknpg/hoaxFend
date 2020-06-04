import React from 'react';
import UserList from '../components/UserList';
import HoaxSubmit from '../components/HoaxSubmit';
import { useSelector } from 'react-redux';

const HomePage = () => {

	const { isLoggedIn } = useSelector(store => store);

	return (
		<div className="container">
			<div className="row">
				<div className="col-6 col-md-8">
					{isLoggedIn && <HoaxSubmit />}
				</div>
				<div className="col-6 col-md-4">
					<UserList />
				</div>
			</div>
		</div>
	);
}

export default HomePage;