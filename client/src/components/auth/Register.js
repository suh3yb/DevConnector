import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { setAlert } from '../../redux/actions/alertAction';
import { register } from '../../redux/actions/authAction';
import PasswordCheck from './PasswordCheck';

import {
  Form,
  Input,
  Button,
  Grid,
  Header,
  Card,
  Icon,
  Label
} from 'semantic-ui-react';
import LayoutGrid from '../layout/LayoutGrid';

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
    <LayoutGrid center>
      <Grid.Column as={Card} raised style={{ maxWidth: '500px' }}>
        <Header color="blue" icon textAlign="center" as="h3">
          <Icon name="user plus" circular />
          <Header.Content>Register</Header.Content>
          <Header.Subheader>Create an account</Header.Subheader>
        </Header>

        <Card.Content>
          <Form onSubmit={e => onSubmit(e)}>
            <Form.Field>
              <Input
                icon="user"
                iconPosition="left"
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
                icon="envelope"
                iconPosition="left"
                type="email"
                placeholder="Email Address"
                name="email"
                value={email}
                onChange={e => onChange(e)}
                required
              />
              <Label pointing="above" color="grey">
                This site uses Gravatar so if you want a profile image, use a
                Gravatar email
              </Label>
            </Form.Field>
            <Form.Field>
              <Input
                icon="key"
                iconPosition="left"
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={e => onChange(e)}
                minLength="6"
              />
              <PasswordCheck currentPassword={password} />
            </Form.Field>
            <Form.Field>
              <Input
                icon="key"
                iconPosition="left"
                type="password"
                placeholder="Confirm Password"
                name="password2"
                value={password2}
                onChange={e => onChange(e)}
                minLength="6"
              />
            </Form.Field>
            <Button primary fluid content="Register" />
          </Form>
        </Card.Content>

        <p className="my-1">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </Grid.Column>
    </LayoutGrid>
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
