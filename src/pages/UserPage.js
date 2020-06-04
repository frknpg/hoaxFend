import React, { useEffect, useState } from 'react';
import ProfileCard from '../components/ProfileCard';
import { getUser } from '../api/apiCalls';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useApiProgress } from '../shared/ApiProgressHook';
import Spinner from '../components/Spinner';
import HoaxFeed from '../components/HoaxFeed';

const UserPage = () => {

	const [user, setUser] = useState({});
	const [notFound, setNotFound] = useState(false);
	const { username } = useParams();
	const pendingApiCall = useApiProgress('get', '/api/1.0/users/' + username, true);

	useEffect(() => {
		const getUserData = async (username) => {
			setNotFound(false);
			try {
				const response = await getUser(username);
				setUser(response.data);
			} catch (err) {
				setNotFound(true);
			}
		}

		getUserData(username);
	}, [username]);

	const { t } = useTranslation();

	if (notFound) {
		return <div className="container">
			<div className="alert alert-danger text-center">
				<div>
					<i className="material-icons" style={{ fontSize: '48px' }}>error</i>
				</div>
				{t('User not found')}
			</div>
		</div>
	}

	if (pendingApiCall || username !== user.username) {
		return <Spinner />
	}

	return (
		<div className="container">
			<div className="row">
				<div className="col-6 col-md-4">
					<ProfileCard user={user} updateUserOnPage={(user) => setUser(user)} />
				</div>
				<div className="col-6 col-md-8">
					<HoaxFeed />
				</div>
			</div>
		</div>
	);
}

export default UserPage;