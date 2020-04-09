import React from 'react';
import { useSelector } from 'react-redux';
import ProfileImage from './ProfileImage';

const ProfileCard = (props) => {

  const { loggedUsername } = useSelector(store => ({
    loggedUsername: store.username
  }));
  const { user } = props;
  const { username, displayName, image } = user;

  return (
    <div className="card text-center">
      <div className="card-header">
        <ProfileImage className="rounded-circle shadow" src={image} width="200px" height="200px" alt={`${username} profile`} />
      </div>
      <div className="card-body">
        <h3>{displayName}@{username}</h3>
      </div>
    </div>
  );
};

export default ProfileCard;