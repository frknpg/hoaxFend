import React from 'react';
import { Link } from 'react-router-dom';
import ProfileImage from './ProfileImage';

const UserListItem = (props) => {
	const { user } = props;
	const { username, displayName, image } = user;

	return (
		<Link className="list-group-item list-group-item-action" to={`/user/${username}`}>
			<ProfileImage className="rounded-circle" image={image} width="32" height="32" alt={`${username} profile`} />
			<span className="pl-2">
				{displayName}@{username}
			</span>
		</Link>
	);
};

export default UserListItem;