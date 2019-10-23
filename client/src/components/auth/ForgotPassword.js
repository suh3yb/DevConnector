import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { forgotPassword } from '../../redux/actions/authAction';
import {
  Grid,
  Header,
  Segment,
  Form,
  Input,
  Message,
  Button
} from 'semantic-ui-react';

const ForgotPassword = ({ forgotPassword }) => {
  const [email, setEmail] = useState('');

  // const { email } = formData;

  const onChange = e => setEmail(e.target.value);

  const onSubmit = async e => {
    e.preventDefault();
    forgotPassword(email);
  };

  return (
    <Grid
      textAlign="center"
      verticalAlign="middle"
      style={{ minHeight: 'calc(100vh - 5rem)' }}>
      <Grid.Column style={{ maxWidth: '550px' }}>
        <Header as="h1" textAlign="center">
          <Header.Content>
            Forgot Password
            <Header.Subheader>Restore your password</Header.Subheader>
          </Header.Content>
        </Header>
        <Segment padded>
          <Form className="form" onSubmit={e => onSubmit(e)}>
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
              <Button size="large" fluid primary>
                Submit
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

ForgotPassword.propTypes = {
  forgotPassword: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { forgotPassword }
)(ForgotPassword);
