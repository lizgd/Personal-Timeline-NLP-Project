import React from 'react';

import { withAuthorization } from '../Session';

const Landing = () => (
  <div>
    <h1>Landing</h1>
  </div>
);

const condition = authUser => {
  if(authUser)
    return 2;
};

export default withAuthorization(condition)(Landing);
