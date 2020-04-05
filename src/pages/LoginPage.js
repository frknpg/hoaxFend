import React, { Component } from 'react';
import { login } from '../api/apiCalls';
import Input from '../components/Input';
import { withTranslation } from 'react-i18next';

class LoginPage extends Component {
  state = {
    username: null,
    password: null,
    pendingApiCall: false,
    errors: {}
  }

  onClickLogin = async (e) => {
    e.preventDefault();
    const { username, password } = this.state;

    this.setState({ pendingApiCall: true });
    try {
      const response = await login({ username, password });
    } catch (err) {
      if (err.response.data.validationErrors) {
        this.setState({ errors: err.response.data.validationErrors })
      }
    }
    this.setState({ pendingApiCall: false });
  }

  onChange = (e) => {
    const { name, value } = e.target;
    const errors = { ...this.state.errors };
    errors[name] = undefined;

    this.setState({
      [name]: value,
      errors
    });
  }

  render() {
    const { t } = this.props;
    const { pendingApiCall, errors } = this.state;
    const { username, password } = errors;

    return (
      <div className="container">
        <form>
          <h1 className="text-center">{t('Login')}</h1>
          <Input label={t('Username')} error={username} onChange={this.onChange} name="username" />
          <Input label={t('Password')} error={password} onChange={this.onChange} name="password" type="password" />
          <div className="text-center">
            <button
              disabled={pendingApiCall}
              className="btn btn-primary"
              onClick={this.onClickLogin}>
              {pendingApiCall && <span className="spinner-border spinner-border-sm" />}
              {t('Login')}
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default withTranslation()(LoginPage);