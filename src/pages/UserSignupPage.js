import React, { useState } from 'react';
import Input from '../components/Input';
import ButtonWithProgress from '../components/ButtonWithProgress';
import { withTranslation } from 'react-i18next';
import { withApiProgress } from '../shared/ApiProgress';
import { connect } from 'react-redux';
import { signupHandler } from '../redux/authActions';

const UserSignupPage = (props) => {

  const [form, setForm] = useState({
    username: null,
    displayName: null,
    password: null,
    passwordRepeat: null
  });
  const [errors, setErrors] = useState({});

  const onChange = e => {
    const { name, value } = e.target;

    setErrors(prevErrors => ({ ...prevErrors, [name]: null }));
    setForm(prevForm => ({ ...prevForm, [name]: value }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const { history, dispatch } = props;
    const { push } = history;

    try {
      await dispatch(signupHandler(form));
      push('/');
    } catch (err) {
      if (err.response.data.validationErrors) {
        setErrors(err.response.data.validationErrors);
      }
    }
  }

  const { t, pendingApiCall } = props;
  const { username: usernameError, displayName: displayNameError, password: passwordError } = errors;

  let passwordRepeatError;
  if (form.password !== form.passwordRepeat) {
    passwordRepeatError = t('Password mismatch');
  }

  return (
    <div className="container">
      <form>
        <h1 className="text-center">{t('Sign Up')}</h1>
        <Input label={t('Username')} error={usernameError} onChange={onChange} name="username" />
        <Input label={t('Display Name')} error={displayNameError} onChange={onChange} name="displayName" />
        <Input label={t('Password')} error={passwordError} onChange={onChange} type="password" name="password" />
        <Input label={t('Password Repeat')} error={passwordRepeatError} onChange={onChange} type="password" name="passwordRepeat" />
        <div className="text-center">
          <ButtonWithProgress
            disabled={pendingApiCall || passwordRepeatError !== undefined}
            pendingApiCall={pendingApiCall}
            onClick={handleSignUp}
            text={t('Sign Up')}
          />
        </div>
      </form>
    </div>
  );
}

const UserSignupPageWithTranslation = withTranslation()(UserSignupPage);
const UserSignupPageWithApiProgressForUsers = withApiProgress(UserSignupPageWithTranslation, '/api/1.0/users');
const UserSignupPageWithApiProgressForLogin = withApiProgress(UserSignupPageWithApiProgressForUsers, '/api/1.0/auth');

export default connect()(UserSignupPageWithApiProgressForLogin);