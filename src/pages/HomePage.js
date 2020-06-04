import React from 'react';
import UserList from '../components/UserList';
import HoaxSubmit from '../components/HoaxSubmit';
import { useSelector } from 'react-redux';
import HoaxFeed from '../components/HoaxFeed';

const HomePage = () => {

	const { isLoggedIn } = useSelector(store => store);

	return (
		<div className="container">
			<div className="row">
				<div className="col-6 col-md-8">
					{isLoggedIn &&
						<div className="mb-2">
							<HoaxSubmit />
						</div>
					}
					<HoaxFeed />
				</div>
				<div className="col-6 col-md-4">
					<UserList />
				</div>
			</div>
		</div>
	);
}

export default HomePage;