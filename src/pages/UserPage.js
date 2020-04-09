import React, { useEffect, useState } from 'react';
import ProfileCard from '../components/ProfileCard';
import { getUser } from '../api/apiCalls';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const UserPage = () => {

	const [user, setUser] = useState({});
	const [notFound, setNotFound] = useState(false);
	const { username } = useParams();

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

	return (
		<div className="container">
			<ProfileCard user={user} />
		</div>
	);
}

export default UserPage;