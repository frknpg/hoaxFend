import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ProfileImage from './ProfileImage';
import { useTranslation } from 'react-i18next';
import { postHoax, postHoaxAttachment } from '../api/apiCalls';
import { useApiProgress } from '../shared/ApiProgressHook';
import ButtonWithProgress from '../components/ButtonWithProgress';
import Input from './Input';
import AutoUploadImage from './AutoUploadImage';

const HoaxSubmit = () => {

  const [hoax, setHoax] = useState('');
  const [errors, setErrors] = useState({});

  const [newImage, setNewImage] = useState();

  const [focused, setFocused] = useState(false);
  const { image } = useSelector(store => store);
  const { t } = useTranslation();

  const pendingApiCall = useApiProgress('post', '/api/1.0/hoaxes', true);
  const pendingFileUplaod = useApiProgress('post', '/api/1.0/hoax-attachments', true);

  useEffect(() => {
    if (!focused) {
      setHoax('');
      setErrors({});
      setNewImage();
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

  const handleChangeFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        setNewImage(fileReader.result);
        uploadFile(file)
      }
      fileReader.readAsDataURL(file);
    }
  };

  const uploadFile = async (file) => {
    const attachment = new FormData();
    attachment.append('file', file);
    await postHoaxAttachment(attachment);
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
        {focused &&
          <>
            {newImage ? <AutoUploadImage image={newImage} uploading={pendingFileUplaod} />
              :
              <Input type="file" onChange={handleChangeFile} />
            }
            <div className="text-right mt-1">
              <ButtonWithProgress className="btn btn-primary" onClick={handleClickHoaxify}
                disabled={pendingApiCall || pendingFileUplaod} pendingApiCall={pendingApiCall}
                text="Hoaxify"
              />
              <button disabled={pendingApiCall || pendingFileUplaod} className="btn btn-light d-inline-flex ml-1" onClick={() => setFocused(false)} >
                <i className="material-icons">close</i> {t("Cancel")}
              </button>
            </div>
          </>
        }
      </div>
    </div>
  );
};

export default HoaxSubmit;