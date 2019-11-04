import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { setAlert } from '../../redux/actions/alertAction';
import { updatePassword } from '../../redux/actions/profileAction';
import LayoutGrid from '../layout/LayoutGrid';
import { Grid, Card, Form, Header, Icon, Input, Button } from 'semantic-ui-react';

const UpdatePassword = ({ setAlert, updatePassword, history }) => {
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    newPassword2: '',
  });

  const { oldPassword, newPassword, newPassword2 } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (newPassword !== newPassword2) {
      setAlert('Passwords do not match', 'danger');
    } else if (oldPassword === newPassword) {
      setAlert('New password must be different from the current password', 'danger');
    } else {
      updatePassword({ oldPassword, newPassword }, history);
    }
  };

  return (
    <LayoutGrid center>
      <Grid.Column as={Card} raised style={{ maxWidth: '500px' }}>
        <Header color="blue" icon textAlign="center" as="h3">
          <Icon name="user" circular />
          <Header.Content>Change Password</Header.Content>
          <Header.Subheader>Update your password</Header.Subheader>
        </Header>

        <Card.Content>
          <Form onSubmit={e => onSubmit(e)}>
            <Form.Field>
              <Input
                type="password"
                placeholder="Current Password"
                name="oldPassword"
                value={oldPassword}
                onChange={e => onChange(e)}
                required
              />
            </Form.Field>

            <Form.Field>
              <Input
                type="password"
                placeholder="New Password"
                name="newPassword"
                value={newPassword}
                onChange={e => onChange(e)}
                minLength="6"
              />
            </Form.Field>
            <Form.Field>
              <Input
                type="password"
                placeholder="Confirm New Password"
                name="newPassword2"
                value={newPassword2}
                onChange={e => onChange(e)}
                minLength="6"
              />
            </Form.Field>
            <Button fluid primary content="Submit" />
            <Button
              primary
              as={Link}
              icon="arrow left"
              to="/dashboard"
              content="Go Back"
              style={{ width: '100%', marginTop: '5px' }}
            />
          </Form>
        </Card.Content>
      </Grid.Column>
    </LayoutGrid>
  );
};

UpdatePassword.propTypes = {
  setAlert: PropTypes.func.isRequired,
  updatePassword: PropTypes.func.isRequired,
};

export default connect(
  null,
  { setAlert, updatePassword },
)(UpdatePassword);
