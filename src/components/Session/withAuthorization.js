import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import AuthUserContext from './context';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const withAuthorization = condition => Component => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged(
        authUser => {
          var tempAns = condition(authUser);
          if (tempAns == 2) {
            this.props.history.push(ROUTES.HOME);
          }
          else if (!tempAns) {
            this.props.history.push(ROUTES.SIGN_IN);
          }
        },
      );
    }

    componentWillUnmount() {
      this.listener();
    }

    isAdmin = () => {
      this.props.firebase.auth.currentUser(currentUser => {
        this.props.firebase.user(currentUser.uid).get({ admin: 'true' }).then(function(doc) {
            // user is an admin
            return true;
        }).catch(function(error) {
            return false;
        });
      });
    }

    render() {
      return (
        <AuthUserContext.Consumer>
          {authUser =>
            condition(authUser) ? <Component {...this.props} /> : null
          }
        </AuthUserContext.Consumer>
      );
    }
  }

  return compose(
    withRouter,
    withFirebase,
  )(WithAuthorization);
};

export default withAuthorization;
