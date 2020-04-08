import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProfileCard = (props) => {

  const { loggedUsername } = useSelector(store => ({
    loggedUsername: store.username
  }));
  const { username: pathUsername } = useParams();

  let message = "We cannot edit :("
  if (pathUsername === loggedUsername) {
    message = "We can edit :)"
  }

  return (
    <div>
      {message}
    </div>
  );
};

export default ProfileCard;