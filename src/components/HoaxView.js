import React, { useState } from 'react';
import ProfileImage from './ProfileImage';
import { Link } from 'react-router-dom';
import { format } from 'timeago.js';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { deleteHoax } from '../api/apiCalls';
import { useApiProgress } from '../shared/ApiProgressHook';
import Modal from './Modal';

const HoaxView = ({ hoax, handleDeleteHoax }) => {

  const { username: loggedUsername } = useSelector(store => store);

  const { id, user, content, timeStamp, fileAttachment } = hoax;
  const { image, displayName, username } = user;

  const { i18n, t } = useTranslation();
  const formatted = format(timeStamp, i18n.language);

  const [modalVisible, setModalVisible] = useState(false);

  const pendingDelete = useApiProgress('delete', `/api/1.0/hoaxes/${id}`, true);

  const handleDeleteClick = async () => {
    try {
      await deleteHoax(id);
      handleDeleteHoax(id);
    } catch (error) {
    }
    setModalVisible(false);
  }

  return (
    <>
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
          {loggedUsername === username &&
            <button className="btn btn-delete-link btn-sm" onClick={() => setModalVisible(true)}>
              <i className="material-icons">delete_outline</i>
            </button>
          }
        </div>
        <div className="pl-5">
          {content}
        </div>
        {fileAttachment && (
          <div className="pl-5">
            {fileAttachment.fileType.startsWith('image') ?
              <img className="img-fluid" src={'images/attachments/' + fileAttachment.name} alt={content} />
              :
              <strong>Hoax has attachment </strong>
            }
          </div>
        )}
      </div>
      {modalVisible && <Modal
        title={t('Delete Hoax')}
        message={
          <div>
            <div><strong>{t('Are you sure to delete hoax?')}</strong></div>
            <span>{content}</span>
          </div>

        }
        handleClose={() => setModalVisible(false)}
        handleOk={handleDeleteClick}
        inProgress={pendingDelete}
      />}
    </>
  );
};

export default HoaxView;