import React from 'react';
import ProfileImage from './ProfileImage';
import { Link } from 'react-router-dom';
import { format } from 'timeago.js';
import { useTranslation } from 'react-i18next';

const HoaxView = ({ hoax }) => {

  const { user, content, timeStamp } = hoax;
  const { image, displayName, username } = user;
  
  const { i18n } = useTranslation();
  const formatted = format(timeStamp, i18n.language);

  return (
    <div className="card p-1">
      <div className="d-flex">
        <ProfileImage image={image} width="32" height="32" className="rounded-circle m-1" />
        <div className="flex-fill m-auto pl-2">
          <Link to={`/user/${username}`} className="text-dark">
            <h6 className="d-inline">{displayName}@{username}</h6>
            <span> - </span>
            <small>{formatted}</small>
          </Link>
        </div>
      </div>
      <div className="pl-5">
        {content}
      </div>
    </div>
  );
};

export default HoaxView;