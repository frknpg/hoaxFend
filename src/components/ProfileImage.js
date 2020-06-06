import React from 'react';
import defaultPicture from '../assets/original.png';

const ProfileImage = (props) => {
	const { image, tempimage } = props;
	let imageSource = defaultPicture;
	if (image) {
		imageSource = 'images/profile/' + image;
	}

	return <img alt="Profile" {...props} src={tempimage || imageSource} onError={(e) => e.target.src = defaultPicture} />
};

export default ProfileImage;