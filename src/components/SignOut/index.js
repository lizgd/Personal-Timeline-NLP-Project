import React from 'react';

import { withFirebase } from '../Firebase';
import { Box, Grommet, Button } from 'grommet';
import { Logout } from 'grommet-icons';

const SignOutButton = ({ firebase }) => (
  <Button
    icon={<Logout color='white' />}
    margin='small'
    primary={true}
    onClick={() => {firebase.doSignOut();}}
    label='Logout'
    />
);

export default withFirebase(SignOutButton);
