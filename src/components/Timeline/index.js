import React, { Component } from 'react';

import { withAuthorization } from '../Session';
import { withFirebase } from '../Firebase';
import TimelineComponent from './timeline';


const condition = authUser => !!authUser;

export default withAuthorization(condition)(TimelineComponent);
