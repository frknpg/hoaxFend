import React from 'react';
import { withRouter } from 'react-router-dom';
// import { Authentication } from '../shared/AuthenticationContext';

const ProfileCard = (props) => {

  // return (
  //   <Authentication.Consumer>
  //     {value => {
        const pathUsername = props.match.params.username;
        const loggedUsername = props.username;
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

export default withRouter(ProfileCard);