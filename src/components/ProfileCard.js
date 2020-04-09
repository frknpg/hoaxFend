import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ProfileImage from './ProfileImage';
import { useTranslation } from 'react-i18next';
import Input from './Input';
import { updateUser } from '../api/apiCalls';
import { useApiProgress } from '../shared/ApiProgressHook';
import ButtonWithProgress from './ButtonWithProgress';

const ProfileCard = (props) => {

  const { user, updateUserOnPage } = props;
  const { username, displayName, image } = user;
  const [inEditMode, setInEditMode] = useState(false);
  const [updatedDisplayName, setUpdatedDisplayName] = useState();
  const { loggedUsername } = useSelector(store => ({
    loggedUsername: store.username
  }));
  const pendingApiCall = useApiProgress('put', '/api/1.0/users/' + username);

  useEffect(() => {
    setUpdatedDisplayName(displayName);
  }, [inEditMode, displayName])

  const onClickSave = async () => {
    try {
      const response = await updateUser(username, { displayName: updatedDisplayName });
      updateUserOnPage(response.data);
      setInEditMode(false);
    } catch (err) { }
  }

  const { t } = useTranslation();

  return (
    <div className="card text-center">
      <div className="card-header">
        <ProfileImage className="rounded-circle shadow" src={image} width="200px" height="200px" alt={`${username} profile`} />
      </div>
      <div className="card-body">
        {!inEditMode ?
          <>
            <h3>{displayName}@{username}</h3>
            {loggedUsername === username &&
              <button className="btn btn-success d-inline-flex" onClick={() => setInEditMode(true)} >
                <i className="material-icons">edit</i> {t('Edit')}
              </button>
            }
          </>
          :
          <div>
            <Input label={t("Change Display Name")} defaultValue={displayName} onChange={(e) => setUpdatedDisplayName(e.target.value)} />
            <div>
              <ButtonWithProgress className="btn btn-primary d-inline-flex" onClick={onClickSave}
                disabled={pendingApiCall} pendingApiCall={pendingApiCall}
                text={<><i className="material-icons" >save</i> {t('Save')}</>}
              />
              <button className="btn btn-light d-inline-flex ml-1" onClick={() => setInEditMode(false)} disabled={pendingApiCall} >
                <i className="material-icons">close</i> {t("Cancel")}
              </button>
            </div>
          </div>
        }
      </div>
    </div>
  );
};

export default ProfileCard;