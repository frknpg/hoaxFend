import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { onLogout } from '../redux/authActions';
import ProfileImage from '../components/ProfileImage';

const TopBar = (props) => {

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { username, isLoggedIn, displayName, image } = useSelector(store => store);

  const [menuVisible, setMenuVisible] = useState(false);
  const menuArea = useRef();

  useEffect(() => {
    document.addEventListener('click', menuClickTracker);

    return () => {
      document.removeEventListener('click', menuClickTracker);
    };
  }, [isLoggedIn]);

  const menuClickTracker = (e) => {
    if (menuArea === null || menuArea.current === null || (menuArea.current && !menuArea.current.contains(e.target))) {
      setMenuVisible(false);
    }
  };

  const onClickLogout = () => {
    dispatch(onLogout());
  }

  let dropdownClass = "dropdown-menu p-0 shadow";
  if (menuVisible)
    dropdownClass += " show";

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
      <ul className="navbar-nav ml-auto" ref={menuArea}>
        <li className="nav-item dropdown">
          <div className="d-flex" style={{ cursor: 'pointer' }} onClick={() => setMenuVisible(true)}>
            <ProfileImage image={image} width="32" height="32" className="rounded-circle m-auto" />
            <span className="nav-link dropdown-toggle">{displayName}</span>
          </div>
          <div className={dropdownClass}>
            <span>
              <Link className="dropdown-item d-flex p-2" to={`/user/${username}`} onClick={() => setMenuVisible(false)} >
                <i className="material-icons text-info mr-2">person</i>
                {t('My Profile')}
              </Link>
            </span>
            <span className="dropdown-item d-flex p-2" onClick={onClickLogout} style={{ cursor: 'pointer' }} >
              <i className="material-icons text-danger mr-2">power_settings_new</i>
              {t('Logout')}
            </span>
          </div>
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

export default TopBar;