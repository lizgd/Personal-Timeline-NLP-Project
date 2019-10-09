import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

import { withAuthorization } from '../Session';

const SignInPage = () => (
  <div>
    <h1>SignIn</h1>
    <SignInGoogle />
  </div>
);

class SignInGoogleBase extends Component {
  constructor(props) {
    super(props);

    this.state = { error: null };
  }

  onSubmit = event => {
    this.props.firebase
      .doSignInWithGoogle()
      .then(socialAuthUser => {
        // Create a user in your Firebase Realtime Database too
       return this.props.firebase
          .user(socialAuthUser.user.uid)
          .set({
            displayName: socialAuthUser.user.displayName,
            email: socialAuthUser.user.email,
            photoURL: socialAuthUser.user.photoURL,
          }, { merge: true });
      })
      .then(() => {
        this.setState({ error: null });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  render() {
    const { error } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <button type="submit">Sign In with Google</button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const condition = authUser => {
  if(authUser)
    return 2;
};


const SignInGoogle = compose(
  withRouter,
  withFirebase,
  withAuthorization(condition),
)(SignInGoogleBase);

export default SignInPage;

export { SignInGoogle };
