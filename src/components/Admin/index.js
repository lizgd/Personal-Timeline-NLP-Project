import React, { Component } from 'react';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';
import * as ROLES from '../../constants/roles';

class AdminPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      users: [],
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase.users().onSnapshot(querySnapshot => {
        var userList = [];
        querySnapshot.forEach(function(doc) {
            var temp = doc.data();
            temp.uid = doc.id;
            userList.push(temp);
        });

        console.log(userList);

        this.setState({
          users: userList,
          loading: false,
        });
    });

  }

  componentWillUnmount() {
    this.props.firebase.users();
  }

  render() {
    const { users, loading } = this.state;

    return (
      <div>
        <h1>Admin</h1>

        {loading && <div>Loading ...</div>}

        <UserList users={users} />
      </div>
    );
  }
}

const UserList = ({ users }) => (
  <ul>
    {users.map(user => (
      <li key={user.uid}>
        <span>
          <strong>ID:</strong> {user.uid}
        </span>
        <span>
          <strong>E-Mail:</strong> {user.email}
        </span>
        <span>
          <strong>DisplayName:</strong> {user.displayName}
        </span>
      </li>
    ))}
  </ul>
);

const condition = authUser => authUser;

export default compose(
  withAuthorization(condition),
  withFirebase,
)(AdminPage);
