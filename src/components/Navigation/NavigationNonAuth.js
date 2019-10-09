import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';

import { Box, Grommet, Button } from 'grommet';
import { Home, Login } from 'grommet-icons';


class NavigationNonAuth extends Component {

  render() {
    return (
      <Box
        tag='header'
        direction='row'
        align='center'
        justify='between'
        background='white'
        pad={{ vertical: 'xxsmall', horizontal: 'medium' }}
      >
         <h1 color="black" nowrap='true'>
            Personal Timeline
          </h1>
         <Box direction='row'>

            <Link to={ROUTES.LANDING}>
              <Button
                icon={<Home color={this.props.location.pathname === ROUTES.LANDING? 'accent-1':'light-2'} />}
                label="Landing"
                margin='small'
                plain={true}
                color={this.props.location.pathname === ROUTES.LANDING? 'accent-1':'light-2'}
                />
            </Link>

            <Link to={ROUTES.SIGN_IN}>
              <Button
                icon={<Login color={this.props.location.pathname === ROUTES.SIGN_IN? 'accent-1':'light-2'} />}
                label="Sign In"
                margin='small'
                plain={true}
                color={this.props.location.pathname === ROUTES.SIGN_IN? 'accent-1':'light-2'}
                />
            </Link>

         </Box>
        </Box>
    );
  }
}

export default withRouter(NavigationNonAuth);
