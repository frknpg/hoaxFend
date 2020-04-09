import React, { useState, useEffect } from 'react';
import Input from '../components/Input';
import { useTranslation } from 'react-i18next';
import ButtonWithProgress from '../components/ButtonWithProgress';
import { useDispatch } from 'react-redux';
import { loginHandler } from '../redux/authActions';
import { useApiProgress } from '../shared/ApiProgressHook';

const LoginPage = (props) => {

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const pendingApiCall = useApiProgress('post', '/api/1.0/auth');

  useEffect(() => {
    setError(null);
  }, [username, password]);

  const onClickLogin = async (e) => {
    e.preventDefault();
    const { history } = props;
    const { push } = history;

    setError(null);
    try {
      await dispatch(loginHandler({ username, password }));
      push('/');
    } catch (err) {
      setError(err.response.data.message);
    }
  }

  const buttonEnabled = username && password;

  return (
    <div className="container">
      <form>
        <h1 className="text-center">{t('Login')}</h1>
        <Input label={t('Username')} onChange={e => setUsername(e.target.value)} />
        <Input label={t('Password')} onChange={e => setPassword(e.target.value)} type="password" />
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="text-center">
          <ButtonWithProgress disabled={pendingApiCall || !buttonEnabled} pendingApiCall={pendingApiCall} onClick={onClickLogin} text={t('Login')} />
        </div>
      </form>
    </div>
  );
}

export default LoginPage;