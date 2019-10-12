import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { setAlert } from '../../redux/actions/alertAction';
import { updatePassword } from '../../redux/actions/profileAction';
import { Button, Divider, Form, Input, Header } from 'semantic-ui-react';

const UpdatePassword = ({ setAlert, updatePassword, history }) => {
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    newPassword2: ''
  });

  const { oldPassword, newPassword, newPassword2 } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (newPassword !== newPassword2) {
      setAlert('Passwords do not match', 'danger');
    } else if (oldPassword === newPassword) {
      setAlert(
        'New password must be different from the current password',
        'danger'
      );
    } else {
      updatePassword({ oldPassword, newPassword }, history);
    }
  };

  return (
    <Fragment>
      <Header
        icon="lock"
        as="h3"
        content="Change Password"
        subheader="Update Your Password"
      />
      <Button as={Link} icon="arrow left" content="Go Back" to="/dashboard" />
      <Divider />
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
        <Button primary>Submit</Button>
      </Form>
    </Fragment>
  );
};

UpdatePassword.propTypes = {
  setAlert: PropTypes.func.isRequired,
  updatePassword: PropTypes.func.isRequired
};

export default connect(
  null,
  { setAlert, updatePassword }
)(UpdatePassword);
