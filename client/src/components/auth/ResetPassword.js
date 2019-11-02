import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { setAlert } from '../../redux/actions/alertAction';
import { updatePasswordViaEmail } from '../../redux/actions/authAction';
import Axios from 'axios';
import Spinner from '../layout/Spinner';

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

const ResetPassword = ({
  setAlert,
  updatePasswordViaEmail,
  isAuthenticated,
  match,
  history
}) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    password2: '',
    tokenValid: false,
    error: false,
    loading: true
  });

  useEffect(() => {
    const { token } = match.params;

    const getEmail = async () => {
      try {
        const res = await Axios.get(`/api/users/reset-password/${token}`);

        if (res.data.email && res.data.message === 'Password reset link ok') {
          setFormData({
            ...formData,
            email: res.data.email,
            tokenValid: true,
            loading: false
          });
        } else {
          setFormData({ ...formData, loading: false });
        }
      } catch (error) {
        setFormData({ ...formData, loading: false, error: true });
      }
    };

    getEmail();
  }, []);

  const { email, password, password2, tokenValid, error, loading } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      updatePasswordViaEmail({ email, password }, history);
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <LayoutGrid center>
      <Grid.Column as={Card} raised style={{ maxWidth: '500px' }}>
        <Header color="blue" icon textAlign="center" as="h3">
          <Icon name="refresh" circular />
          <Header.Content>Reset Pasword</Header.Content>
          <Header.Subheader>Change your password</Header.Subheader>
        </Header>

        {error ? (
          <p>Connection problem occurred!</p>
        ) : loading ? (
          <Spinner></Spinner>
        ) : tokenValid ? (
          <Card.Content>
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
              <Button primary fluid content="Submit" />
            </Form>
          </Card.Content>
        ) : (
          <p>Token is not valid</p>
        )}
      </Grid.Column>
    </LayoutGrid>
  );
};

ResetPassword.propTypes = {
  setAlert: PropTypes.func.isRequired,
  updatePasswordViaEmail: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { setAlert, updatePasswordViaEmail }
)(ResetPassword);
