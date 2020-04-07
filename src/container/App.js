import React, { Component, useReducer } from 'react';
import UserSignupPage from '../pages/UserSignupPage';
import LoginPage from '../pages/LoginPage';
import LanguageSelector from '../components/LanguageSelector';
import TopBar from '../components/TopBar';
import HomePage from '../pages/HomePage';
import UserPage from '../pages/UserPage';
import { HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

class App extends Component {

  state = {
    isLoggedIn: false,
    username: ''
  };

  onLoginSuccess = (username) => {
    this.setState({ isLoggedIn: true, username });
  }

  onLogout = () => {
    this.setState({ isLoggedIn: false, username: '' });
  }

  render() {
    const { isLoggedIn, username } = this.state;

    return (
      <div>
        <Router>
          <TopBar username={username} isLoggedIn={isLoggedIn} onLogout={this.onLogout} />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/user/:username" component={(props) => <UserPage username={username} {...props} />} />
            {!isLoggedIn &&
              <>
                <Route path="/login" component={(reactRouterProps) => <LoginPage onLoginSuccess={this.onLoginSuccess} {...reactRouterProps} />} />
                <Route path="/signup" component={UserSignupPage} />
              </>
            }
            <Redirect to="/" />
          </Switch>
        </Router>
        <LanguageSelector />
      </div >
    );
  }
}

export default App;
