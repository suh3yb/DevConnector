import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
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

import { resetPassword } from '../../redux/actions/authAction';

const ForgotPassword = ({ resetPassword, isAuthenticated }) => {
  const [email, setEmail] = useState('');

  const onChange = e => setEmail(e.target.value);

  const onSubmit = async e => {
    e.preventDefault();
    resetPassword(email);
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <LayoutGrid center>
      <Grid.Column as={Card} raised style={{ maxWidth: '500px' }}>
        <Header color="blue" icon textAlign="center" as="h3">
          <Icon name="user" circular />
          <Header.Content>Forgot Password</Header.Content>
          <Header.Subheader>Save your password</Header.Subheader>
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
            <Button
              fluid
              primary
              type="submit"
              icon="paper plane"
              content="Send Email"
            />
          </Form>
        </Card.Content>
      </Grid.Column>
    </LayoutGrid>
  );
};

ForgotPassword.propTypes = {
  resetPassword: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { resetPassword }
)(ForgotPassword);
