import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import { Authentication } from '../shared/AuthenticationContext';

const TopBar = (props) => {

  const context = useContext(Authentication);

  const { t } = props;
  const { state, onLogout } = context;
  const { isLoggedIn, username } = state;

  let links = (
    <ul className="navbar-nav ml-auto">
      <li>
        <Link className="nav-link" to="/login" >
          {t('Login')}
        </Link>
      </li>
      <li>
        <Link className="nav-link" to="/signup" >
          {t('Sign Up')}
        </Link>
      </li>
    </ul>
  );

  if (isLoggedIn) {
    links = (
      <ul className="navbar-nav ml-auto">
        <Link className="nav-link" to={`/user/${username}`} >
          {username}
        </Link>
        <li className="nav-link" onClick={onLogout} style={{ cursor: 'pointer' }} >
          {t('Logout')}
        </li>
      </ul>
    )
  }

  return (
    <div className="shadow-sm bg-light mb-2">
      <nav className="navbar navbar-light container navbar-expand">
        <Link className="navbar-brand" to="/">
          <img src="//logo.clearbit.com/spotify.com?size=60&greyscale=true" alt="Loaxify Logo" /> Hoaxify
        </Link>
        {links}
      </nav>
    </div>
  );
}

export default withTranslation()(TopBar);