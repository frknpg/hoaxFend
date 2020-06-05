import React, { useState, useEffect } from 'react';
import { getHoaxes, getOldHoaxes, getNewHoaxCount } from '../api/apiCalls';
import { useApiProgress } from '../shared/ApiProgressHook';
import { useTranslation } from 'react-i18next';
import HoaxView from './HoaxView';
import Spinner from './Spinner';
import { useParams } from 'react-router-dom';

const HoaxFeed = () => {

  const [hoaxPage, setHoaxPage] = useState({ content: [], last: true, number: 0 });
  const [loadOldHoaxesProgress, setLoadOldHoaxesProgress] = useState(false);
  const [newHoaxCount, setNewHoaxCount] = useState(0);

  const { username } = useParams();
  const { t } = useTranslation();

  const path = username ? `/api/1.0/users/${username}/hoaxes` : '/api/1.0/hoaxes';
  const pendingApiCall = useApiProgress('get', path);

  useEffect(() => {
    const loadHoaxes = async (page) => {
      try {
        const response = await getHoaxes(username, page);
        setHoaxPage(prev => ({
          ...response.data,
          content: prev.content.concat(response.data.content)
        }));
      } catch (error) {

      }
    };

    loadHoaxes();
  }, [username]);


  useEffect(() => {
    const getCount = async () => {
      if (hoaxPage.content.length) {
        const id = hoaxPage.content[0].id;
        const response = await getNewHoaxCount(username, id);
        setNewHoaxCount(response.data.count);
      }
    };

    let looper = setInterval(() => {
      getCount();
    }, 2500);

    return () => {
      clearInterval(looper)
    };
  }, [hoaxPage.content, username]);


  const loadOldHoaxes = async () => {
    const lastHoaxIndex = hoaxPage.content.length - 1;
    const lastHoaxId = hoaxPage.content[lastHoaxIndex].id;
    setLoadOldHoaxesProgress(true);
    try {
      const response = await getOldHoaxes(username, lastHoaxId);
      setHoaxPage(prev => ({
        ...response.data,
        content: prev.content.concat(response.data.content)
      }));
    } catch (error) {

    }
    setLoadOldHoaxesProgress(false);
  };

  const { content, last } = hoaxPage;

  if (content.length === 0) {
    return <div className="alert alert-secondary text-center">
      {pendingApiCall ?
        <Spinner />
        :
        t('There are no hoaxes')
      }
    </div>
  }

  return (
    <div>
      {newHoaxCount > 0 &&
        <div
          className="alert alert-secondary text-center"
          onClick={() => !loadOldHoaxesProgress && loadOldHoaxes()}
          style={{ cursor: loadOldHoaxesProgress ? 'not-allowed' : 'pointer' }}
        >
          {loadOldHoaxesProgress ?
            <Spinner />
            :
            t('There are new hoaxes')
          }
        </div>
      }
      {content.map(hoax => (
        <HoaxView key={hoax.id} hoax={hoax} />
      ))}
      {!last &&
        <div
          className="alert alert-secondary text-center"
          onClick={() => !loadOldHoaxesProgress && loadOldHoaxes()}
          style={{ cursor: loadOldHoaxesProgress ? 'not-allowed' : 'pointer' }}
        >
          {loadOldHoaxesProgress ?
            <Spinner />
            :
            t('Load old hoaxes')
          }
        </div>
      }
    </div>
  );
};

export default HoaxFeed;