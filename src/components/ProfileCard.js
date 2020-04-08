import React from 'react';
import { withRouter } from 'react-router-dom';
// import { Authentication } from '../shared/AuthenticationContext';
import { connect } from 'react-redux';

const ProfileCard = (props) => {

  // return (
  //   <Authentication.Consumer>
  //     {value => {
  const pathUsername = props.match.params.username;
  const { loggedUsername } = props;
  let message = "We cannot edit :("
  if (pathUsername === loggedUsername) {
    message = "We can edit :)"
  }

  return (
    <div>
      {message}
    </div>
  );
  //     }}
  //   </Authentication.Consumer>
  // )
};

const mapStateToProps = (store) => ({
  loggedUsername: store.username
});

export default connect(mapStateToProps)(withRouter(ProfileCard));