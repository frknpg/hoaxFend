import React from 'react';
import ProfileCard from '../components/ProfileCard';

const Userpage = (props) => {
	const { username } = props;

	return (
		<div className="container">
			<ProfileCard username={username}/>
		</div>
	);
}

export default Userpage;