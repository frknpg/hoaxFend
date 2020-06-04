import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ProfileImage from './ProfileImage';
import { useTranslation } from 'react-i18next';
import { postHoax } from '../api/apiCalls';
import { useApiProgress } from '../shared/ApiProgressHook';
import ButtonWithProgress from '../components/ButtonWithProgress';

const HoaxSubmit = () => {

  const [hoax, setHoax] = useState('');
  const [errors, setErrors] = useState({});

  const [focused, setFocused] = useState(false);
  const { image } = useSelector(store => store);
  const { t } = useTranslation();

  const pendingApiCall = useApiProgress('post', '/api/1.0/hoaxes');

  useEffect(() => {
    if (!focused) {
      setHoax('');
      setErrors({});
    }
  }, [focused]);

  useEffect(() => {
    setErrors({});
  }, [hoax]);

  const handleClickHoaxify = async () => {
    const body = { content: hoax };
    setErrors({});
    try {
      await postHoax(body);
      setFocused(false);
    } catch (err) {
      if (err.response.data.validationErrors) {
        setErrors(err.response.data.validationErrors)
      }
    }
  };

  const { content } = errors;

  let textAreaClass = "form-control";
  if (content) {
    textAreaClass += " is-invalid";
  }

  return (
    <div className="card p-1 flex-row">
      <ProfileImage image={image} width="32" height="32" className="rounded-circle mr-1" />
      <div className="flex-fill">
        <textarea
          className={textAreaClass}
          rows={focused ? '3' : '1'}
          onFocus={() => setFocused(true)}
          onChange={(e) => setHoax(e.target.value)}
          value={hoax}
        />
        <div className="invalid-feedback">{content}</div>
        {focused && <div className="text-right mt-1">
          <ButtonWithProgress className="btn btn-primary" onClick={handleClickHoaxify}
            disabled={pendingApiCall} pendingApiCall={pendingApiCall}
            text="Hoaxify"
          />
          <button disabled={pendingApiCall} className="btn btn-light d-inline-flex ml-1" onClick={() => setFocused(false)} >
            <i className="material-icons">close</i> {t("Cancel")}
          </button>
        </div>}
      </div>
    </div>
  );
};

export default HoaxSubmit;