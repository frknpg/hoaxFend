import React, { Component, useReducer } from 'react';
import UserSignupPage from '../pages/UserSignupPage';
import LoginPage from '../pages/LoginPage';
import LanguageSelector from '../components/LanguageSelector';
import TopBar from '../components/TopBar';
import HomePage from '../pages/HomePage';
import UserPage from '../pages/UserPage';
import { HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
// import { Authentication } from '../shared/AuthenticationContext';

class App extends Component {

  // static contextType = Authentication;

  render() {
    // const { isLoggedIn } = this.context.state;
    const isLoggedIn = false;

    return (
      <div>
        <Router>
          <TopBar />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/user/:username" component={UserPage} />
            {!isLoggedIn &&
              <>
                <Route path="/login" component={LoginPage} />
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
