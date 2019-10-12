import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Segment,
  Header,
  Icon,
  Form,
  Input,
  Button,
  Grid,
  Message
} from 'semantic-ui-react';

import { login } from '../../redux/actions/authAction';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    login(email, password);
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
            Sign In
            <Header.Subheader>Sign Into Your Account</Header.Subheader>
          </Header.Content>
        </Header>
        <Segment padded>
          <Form className="form" onSubmit={e => onSubmit(e)}>
            <Form.Field>
              <Input
                icon="envelope"
                type="email"
                placeholder="Email Address"
                name="email"
                value={email}
                onChange={e => onChange(e)}
                required
              />
            </Form.Field>
            <Form.Field>
              <Input
                icon="lock"
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={e => onChange(e)}
                minLength="6"
              />
            </Form.Field>
            <Form.Field>
              <Button size="large" fluid primary>
                Login
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

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { login }
)(Login);
