import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ProfileImage from './ProfileImage';
import { useTranslation } from 'react-i18next';
import { postHoax } from '../api/apiCalls';

const HoaxSubmit = () => {

  const [hoax, setHoax] = useState('');

  const [focused, setFocused] = useState(false);
  const { image } = useSelector(store => store);
  const { t } = useTranslation();

  useEffect(() => {
    if (!focused) {
      setHoax('');
    }
  }, [focused]);

  const handleClickHoaxify = async () => {
    const body = { content: hoax };
    try {
      await postHoax(body);
    } catch (error) {
      
    }
  };

  return (
    <div className="card p-1 flex-row">
      <ProfileImage image={image} width="32" height="32" className="rounded-circle mr-1" />
      <div className="flex-fill">
        <textarea
          className="form-control"
          rows={focused ? '3' : '1'}
          onFocus={() => setFocused(true)}
          onChange={(e) => setHoax(e.target.value)}
          value={hoax}
        />
        {focused && <div className="text-right mt-1">
          <button className="btn btn-primary" onClick={handleClickHoaxify}>Hoaxify</button>
          <button className="btn btn-light d-inline-flex ml-1" onClick={() => setFocused(false)} >
            <i className="material-icons">close</i> {t("Cancel")}
          </button>
        </div>}
      </div>
    </div>
  );
};

export default HoaxSubmit;