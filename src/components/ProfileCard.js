import React from 'react';
import { useSelector } from 'react-redux';
import defaultPicture from '../assets/original.png';

const ProfileCard = (props) => {

  const { loggedUsername } = useSelector(store => ({
    loggedUsername: store.username
  }));
  const { user } = props;
  const { username, displayName, image } = user;

  return (
    <div className="card text-center">
      <div className="card-header">
        <img className="rounded-circle shadow" width="200" height="200" src={image || defaultPicture} alt={`${username} profile`} />
      </div>
      <div className="card-body">
        <h3>{displayName}@{username}</h3>
      </div>
    </div>
  );
};

export default ProfileCard;