import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { login } from '../../redux/actions/authAction';
import SocialLogin from './SocialLogin';

import {
  Form,
  Input,
  Button,
  Grid,
  Header,
  Card,
  Icon
} from 'semantic-ui-react';
import LayoutGrid from '../layout/LayoutGrid';

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
    <LayoutGrid center>
      <Grid.Column as={Card} raised style={{ maxWidth: '500px' }}>
        <Header icon textAlign="center" as="h3">
          <Icon name="key" circular />
          <Header.Content>Login</Header.Content>
          <Header.Subheader>Sign into your account</Header.Subheader>
        </Header>
        <Card.Content>
          <Form onSubmit={e => onSubmit(e)}>
            <Form.Field>
              <Input
                type="email"
                placeholder="Email Address"
                name="email"
                value={email}
                onChange={e => onChange(e)}
                required
              />
            </Form.Field>
            <Form.Field>
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={e => onChange(e)}
                minLength="6"
              />
            </Form.Field>
            <Form.Field>
              <Button primary fluid content="Login" />
            </Form.Field>
          </Form>
        </Card.Content>

        <p className="my-1">
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
        <p className="my-1">
          <Link to="/forgot-password">Forgot Password?</Link>
        </p>
        <Card.Content textAlign="center">
          <SocialLogin />
        </Card.Content>
      </Grid.Column>
    </LayoutGrid>
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
