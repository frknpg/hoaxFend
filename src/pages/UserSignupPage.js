import React, { Component } from 'react';
import { signUp } from '../api/apiCalls';
import Input from '../components/Input';
import { withTranslation } from 'react-i18next';

class UserSignupPage extends Component {
  state = {
    username: null,
    displayName: null,
    password: null,
    passwordRepeat: null,
    pendingApiCall: false,
    errors: {}
  }

  handleSignUp = async (e) => {
    e.preventDefault();
    const { username, displayName, password } = this.state;

    this.setState({ pendingApiCall: true });

    try {
      const response = await signUp({ username, displayName, password });
    } catch (err) {
      if (err.response.data.validationErrors) {
        this.setState({ errors: err.response.data.validationErrors })
      }
    }
    this.setState({ pendingApiCall: false });
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
    const { t } = this.props;
    const { pendingApiCall, errors } = this.state;
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
            <button
              disabled={pendingApiCall}
              className="btn btn-primary"
              onClick={this.handleSignUp}>
              {pendingApiCall && <span className="spinner-border spinner-border-sm" />}
              {t('Sign Up')}
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default withTranslation()(UserSignupPage);