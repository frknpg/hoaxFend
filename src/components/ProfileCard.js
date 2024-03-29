import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProfileImage from './ProfileImage';
import { useTranslation } from 'react-i18next';
import Input from './Input';
import { updateUser, deleteUser } from '../api/apiCalls';
import { useApiProgress } from '../shared/ApiProgressHook';
import ButtonWithProgress from './ButtonWithProgress';
import { updateSuccess, onLogout } from '../redux/authActions';
import Modal from './Modal';
import { useHistory } from 'react-router-dom';

const ProfileCard = (props) => {

  const { user, updateUserOnPage } = props;
  const { username, displayName, image } = user;
  const [inEditMode, setInEditMode] = useState(false);
  const [updatedDisplayName, setUpdatedDisplayName] = useState();
  const [newImage, setNewImage] = useState();
  const [errors, setErrors] = useState({});
  const [modalVisible, setModalVisible] = useState(false);

  const { loggedUsername } = useSelector(store => ({
    loggedUsername: store.username
  }));

  const pendingApiCall = useApiProgress('put', '/api/1.0/users/' + username);
  const pendingDelete = useApiProgress('delete', '/api/1.0/users/' + username, true);

  const dispatch = useDispatch();

  const history = useHistory();

  useEffect(() => {
    setUpdatedDisplayName(displayName);
    setNewImage();
    setErrors({})
  }, [inEditMode, displayName]);

  useEffect(() => {
    setErrors(prevErrors => ({
      ...prevErrors,
      displayName: undefined
    }));
  }, [updatedDisplayName]);

  useEffect(() => {
    setErrors(prevErrors => ({
      ...prevErrors,
      image: undefined
    }));
  }, [newImage]);

  const onClickSave = async () => {
    let image;
    if (newImage) {
      image = newImage.split(',')[1];
    }
    try {
      const response = await updateUser(username, { displayName: updatedDisplayName, image });
      updateUserOnPage(response.data);
      setInEditMode(false);
      dispatch(updateSuccess(response.data));
    } catch (err) {
      setErrors(err.response.data.validationErrors);
    }
  };

  const onChangeFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        setNewImage(fileReader.result);
      }
      fileReader.readAsDataURL(file);
    }
  };

  const handleDeleteUser = async () => {
    try {
      await deleteUser(username);
      dispatch(onLogout());
      history.push('/');
    } catch (error) {
    }
    setModalVisible(false);
  };

  const { t } = useTranslation();
  const { displayName: displayNameError, image: imageError } = errors;

  return (
    <div className="card text-center">
      <div className="card-header">
        <ProfileImage className="rounded-circle shadow"
          image={image} tempimage={newImage}
          width="200px" height="200px"
          alt={`${username} profile`} />
      </div>
      <div className="card-body">
        {!inEditMode ?
          <>
            <h3>{displayName}@{username}</h3>
            {loggedUsername === username &&
              <>
                <button className="btn btn-success d-inline-flex" onClick={() => setInEditMode(true)} >
                  <i className="material-icons">edit</i> {t('Edit')}
                </button>
                <div className="pt-2">
                  <ButtonWithProgress className="btn btn-danger d-inline-flex" onClick={() => setModalVisible(true)}
                    disabled={pendingDelete} pendingApiCall={pendingDelete}
                    text={<><i className="material-icons">directions_run</i> {t('Delete My Account')}</>}
                  />
                </div>
              </>
            }
          </>
          :
          <div>
            <Input label={t("Change Display Name")} error={displayNameError} defaultValue={displayName} onChange={(e) => setUpdatedDisplayName(e.target.value)} />
            <Input error={imageError} type="file" onChange={onChangeFile} />
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
      {modalVisible && <Modal
        title={t('Delete My Account')}
        message={
          <div><strong>{t('Are you sure to delete your account?')}</strong></div>
        }
        handleClose={() => setModalVisible(false)}
        handleOk={handleDeleteUser}
        inProgress={pendingDelete}
      />}
    </div>
  );
};

export default ProfileCard;