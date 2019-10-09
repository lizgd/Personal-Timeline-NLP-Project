import React from 'react';

import { withAuthorization } from '../Session';

const GraphPage = () => (
  <div>
    <h1>Graph</h1>
  </div>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(GraphPage);
