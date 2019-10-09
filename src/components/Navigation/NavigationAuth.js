import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';

import { Box, Grommet, Button } from 'grommet';
import { BarChart, Technology, ShareOption, Home, User, Logout } from 'grommet-icons';


/* const NavBar = () => (
  <Box
    tag='header'
    direction='row'
    align='center'
    justify='between'
    background='white'
    pad={{ vertical: 'xsmall', horizontal: 'medium' }}
  />
); */

class NavigationAuth extends Component {

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
        <Box direction='row' align='center'>
          <Link to={ROUTES.HOME}>
             <Button
               icon={<Home color={this.props.location.pathname === ROUTES.HOME? 'accent-1':'light-2'} />}
               label="Home"
               margin='small'
               plain={true}
               color={this.props.location.pathname === ROUTES.HOME ? 'accent-1':'light-2'}
               />
           </Link>
           <Link to={ROUTES.TIMELINE}>
             <Button
               icon={<BarChart color={this.props.location.pathname === ROUTES.TIMELINE? 'accent-1':'light-2'} />}
               label="Timeline"
               margin='small'
               plain={true}
               color={this.props.location.pathname === ROUTES.TIMELINE? 'accent-1':'light-2'}
               />
            </Link>
            <Link to={ROUTES.GRAPH}>
              <Button
                icon={<ShareOption color={this.props.location.pathname === ROUTES.GRAPH? 'accent-1':'light-2'} />}
                label="Graph"
                margin='small'
                plain={true}
                color={this.props.location.pathname === ROUTES.GRAPH? 'accent-1':'light-2'}
                />
            </Link>
            <Link to={ROUTES.ACCOUNT}>
               <Button
                 icon={<User color={this.props.location.pathname === ROUTES.ACCOUNT? 'accent-1':'light-2'} />}
                 label="Account"
                 margin='small'
                 plain={true}
                 color={this.props.location.pathname === ROUTES.ACCOUNT? 'accent-1':'light-2'}
                 />
            </Link>

            <SignOutButton />
         </Box>
        </Box>


    );
  }
}

export default withRouter(NavigationAuth);
