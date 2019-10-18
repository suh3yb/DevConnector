import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { setAlert } from '../../redux/actions/alertAction';
import { register } from '../../redux/actions/authAction';
import {
  Grid,
  Header,
  Segment,
  Form,
  Input,
  Message,
  Button,
  Label
} from 'semantic-ui-react';

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register({ name, email, password });
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
            Sign Up
            <Header.Subheader>Create New Account</Header.Subheader>
          </Header.Content>
        </Header>
        <Segment padded>
          <Form className="form" onSubmit={e => onSubmit(e)}>
            <Form.Field>
              <Input
                type="text"
                placeholder="Name"
                name="name"
                value={name}
                onChange={e => onChange(e)}
                required
              />
            </Form.Field>
            <Form.Field>
              <Input
                type="email"
                placeholder="Email Address"
                name="email"
                value={email}
                onChange={e => onChange(e)}
                required
              />
              <Label color="black" icon="user" pointing="above" content="">
                This site uses Gravatar so if you want a profile image, use a
                Gravatar email
              </Label>
            </Form.Field>
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
                Sign Up
              </Button>
            </Form.Field>
          </Form>
          <Message info>
            Already have an account? <Link to="/login">Sign In</Link>
          </Message>
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { setAlert, register }
)(Register);
