import React from 'react';
import defaultPicture from '../assets/original.png';

const ProfileImage = (props) => {
	const { image } = props;
	return <img alt="Profile" {...props} src={image || defaultPicture} />
};

export default ProfileImage;