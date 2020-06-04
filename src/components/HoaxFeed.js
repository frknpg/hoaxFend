import React, { useState, useEffect } from 'react';
import { getHoaxes } from '../api/apiCalls';
import { useApiProgress } from '../shared/ApiProgressHook';
import { useTranslation } from 'react-i18next';
import HoaxView from './HoaxView';
import Spinner from './Spinner';
import { useParams } from 'react-router-dom';

const HoaxFeed = () => {

  const [hoaxPage, setHoaxPage] = useState({ content: [], last: true, number: 0 });

  const { username } = useParams();
  const path = username ? `/api/1.0/users/${username}/hoaxes` : '/api/1.0/hoaxes';
  const pendingApiCall = useApiProgress('get', path);
  const { t } = useTranslation();


  useEffect(() => {
    loadHoaxes();
  }, []);

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

  const { content, last, number } = hoaxPage;

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
      {content.map(hoax => (
        <HoaxView key={hoax.id} hoax={hoax} />
      ))}
      {!last &&
        <div
          className="alert alert-secondary text-center"
          onClick={() => !pendingApiCall && loadHoaxes(number + 1)}
          style={{ cursor: pendingApiCall ? 'not-allowed' : 'pointer' }}
        >
          {pendingApiCall ?
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