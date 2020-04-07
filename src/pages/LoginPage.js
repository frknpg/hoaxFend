import React, { Component } from 'react';
import { login } from '../api/apiCalls';
import Input from '../components/Input';
import { withTranslation } from 'react-i18next';
import ButtonWithProgress from '../components/ButtonWithProgress';
import axios from 'axios';

class LoginPage extends Component {
  state = {
    username: null,
    password: null,
    error: null
  }

  onClickLogin = async (e) => {
    e.preventDefault();
    const { username, password } = this.state;

    this.setState({ error: null });
    try {
      await login({ username, password });
    } catch (err) {
      this.setState({ error: err.response.data.message })
    }
  }

  onChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
      error: null
    });
  }

  render() {
    const { t, pendingApiCall } = this.props;
    const { username, password, error } = this.state;

    const buttonEnabled = username && password;

    return (
      <div className="container">
        <form>
          <h1 className="text-center">{t('Login')}</h1>
          <Input label={t('Username')} onChange={this.onChange} name="username" />
          <Input label={t('Password')} onChange={this.onChange} name="password" type="password" />
          {error && <div className="alert alert-danger">{error}</div>}
          <div className="text-center">
            <ButtonWithProgress disabled={pendingApiCall || !buttonEnabled} pendingApiCall={pendingApiCall} onClick={this.onClickLogin} text={t('Login')} />
          </div>
        </form>
      </div>
    );
  }
}

export default withTranslation()(LoginPage);