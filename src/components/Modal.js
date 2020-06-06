import React from 'react';
import { useTranslation } from 'react-i18next';
import ButtonWithProgress from './ButtonWithProgress';

const Modal = ({ title, message, handleClose, handleOk, inProgress }) => {

  const { t } = useTranslation();

  return (
    <>
      <div className="modal fade show d-block" style={{ backgroundColor: '#000000b0' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
            </div>
            <div className="modal-body">
              {message}
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={handleClose}>{t('Cancel')}</button>
              <ButtonWithProgress
                className="btn btn-danger"
                onClick={handleOk} text={t('OK')}
                disabled={inProgress} pendingApiCall={inProgress}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;