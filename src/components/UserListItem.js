import React from 'react';
import defaultPicture from '../assets/original.png';
import { Link } from 'react-router-dom';

const UserListItem = (props) => {
	const { user } = props;
	const { username, displayName, image } = user;

	return (
		<Link className="list-group-item list-group-item-action" to={`/user/${username}`}>
			<img className="rounded-circle" width="32" height="32" src={image || defaultPicture} alt={`${username} profile`} />
			<span className="pl-2">
				{displayName}@{username}
			</span>
		</Link>
	);
};

export default UserListItem;