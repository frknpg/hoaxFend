import React, { Component } from 'react';
import Input from '../components/Input';
import ButtonWithProgress from '../components/ButtonWithProgress';
import { withTranslation } from 'react-i18next';
import { withApiProgress } from '../shared/ApiProgress';
import { connect } from 'react-redux';
import { signupHandler } from '../redux/authActions';
class UserSignupPage extends Component {
  state = {
    username: null,
    displayName: null,
    password: null,
    passwordRepeat: null,
    errors: {}
  }

  handleSignUp = async (e) => {
    e.preventDefault();
    const { username, displayName, password } = this.state;

    const { history, dispatch } = this.props;
    const { push } = history;

    try {
      await dispatch(signupHandler({ username, displayName, password }));
      push('/');
    } catch (err) {
      if (err.response.data.validationErrors) {
        this.setState({ errors: err.response.data.validationErrors })
      }
    }
  }

  handleChange = (e) => {
    const { t } = this.props;
    const { name, value } = e.target;
    const errors = { ...this.state.errors };
    errors[name] = undefined;

    if (name === 'password' || name === 'passwordRepeat') {
      if (name === 'password' && value !== this.state.passwordRepeat) {
        errors.passwordRepeat = t('Password mismatch');
      } else if (name === 'passwordRepeat' && value !== this.state.password) {
        errors.passwordRepeat = t('Password mismatch');
      } else {
        errors.passwordRepeat = undefined;
      }
    }

    this.setState({
      [name]: value,
      errors
    });
  }

  render() {
    const { t, pendingApiCall } = this.props;
    const { errors } = this.state;
    const { username, displayName, password, passwordRepeat } = errors;

    return (
      <div className="container">
        <form>
          <h1 className="text-center">{t('Sign Up')}</h1>
          <Input label={t('Username')} error={username} onChange={this.handleChange} name="username" />
          <Input label={t('Display Name')} error={displayName} onChange={this.handleChange} name="displayName" />
          <Input label={t('Password')} error={password} onChange={this.handleChange} name="password" type="password" />
          <Input label={t('Password Repeat')} error={passwordRepeat} onChange={this.handleChange} name="passwordRepeat" type="password" />
          <div className="text-center">
            <ButtonWithProgress disabled={pendingApiCall || passwordRepeat !== undefined} pendingApiCall={pendingApiCall} onClick={this.handleSignUp} text={t('Sign Up')} />
          </div>
        </form>
      </div>
    );
  }
}

const UserSignupPageWithTranslation = withTranslation()(UserSignupPage);
const UserSignupPageWithApiProgressForUsers = withApiProgress(UserSignupPageWithTranslation, '/api/1.0/users');
const UserSignupPageWithApiProgressForLogin = withApiProgress(UserSignupPageWithApiProgressForUsers, '/api/1.0/auth');

export default connect()(UserSignupPageWithApiProgressForLogin);