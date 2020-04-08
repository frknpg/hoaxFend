import React, { Component } from 'react';
import UserSignupPage from '../pages/UserSignupPage';
import LoginPage from '../pages/LoginPage';
import LanguageSelector from '../components/LanguageSelector';
import TopBar from '../components/TopBar';
import HomePage from '../pages/HomePage';
import UserPage from '../pages/UserPage';
import { HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
// import { Authentication } from '../shared/AuthenticationContext';
import { connect } from 'react-redux';

class App extends Component {

  // static contextType = Authentication;

  render() {
    const { isLoggedIn } = this.props;

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

const mapStateToProps = (store) => ({
  isLoggedIn: store.isLoggedIn
});

export default connect(mapStateToProps)(App);
