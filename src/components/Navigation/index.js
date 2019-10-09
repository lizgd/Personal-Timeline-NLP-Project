import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';

import { AuthUserContext } from '../Session';
import NavigationAuth from './NavigationAuth';
import NavigationNonAuth from './NavigationNonAuth';


const Navigation = () => (
  <div>
    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? <NavigationAuth /> : <NavigationNonAuth />
      }
    </AuthUserContext.Consumer>
  </div>
);

export default Navigation;
