import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Segment,
  Header,
  Form,
  Input,
  Button,
  Grid,
  Message
} from 'semantic-ui-react';

import { changePasword } from '../../redux/actions/authAction';

const ChangePassword = ({ changePassword, history }) => {
  const [formData, setFormData] = useState({
    password: '',
    password2: ''
  });

  const { password, password2 } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (newPassword !== newPassword2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      changePassword({ password }, history);
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Grid
      textAlign="center"
      verticalAlign="middle"
      style={{ minHeight: 'calc(100vh - 5rem)' }}>
      <Grid.Column style={{ maxWidth: '550px' }}>
        <Header as="h1" textAlign="center">
          <Header.Content>
            Reset Password
            <Header.Subheader>Change Your Password</Header.Subheader>
          </Header.Content>
        </Header>
        <Segment padded>
          <Form className="form" onSubmit={e => onSubmit(e)}>
            <Form.Field>
              <Input
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={e => onChange(e)}
                minLength="6"
              />
            </Form.Field>
            <Form.Field>
              <Input
                type="password"
                placeholder="Confirm Password"
                name="password2"
                value={password2}
                onChange={e => onChange(e)}
                minLength="6"
              />
            </Form.Field>
            <Form.Field>
              <Button size="large" fluid primary>
                Change Password
              </Button>
            </Form.Field>
          </Form>
          <Message>
            Don't have an account? <Link to="/register">Sign Up</Link>
          </Message>
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

ChangePassword.propTypes = {
  changePassword: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { changePassword }
)(ChangePassword);
