import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import UserSignupPage from './pages/UserSignupPage';
import * as serviceWorker from './serviceWorker';
import './bootstrap-override.scss';

ReactDOM.render(<UserSignupPage />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
