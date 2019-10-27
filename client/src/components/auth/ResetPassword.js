import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { setAlert } from '../../redux/actions/alertAction';
import { updatePasswordViaEmail } from '../../redux/actions/authAction';
import Axios from 'axios';
import Spinner from '../layout/Spinner';

const ResetPassword = ({ setAlert, updatePasswordViaEmail, isAuthenticated, match, history }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    password2: '',
    tokenValid: false,
    error: false,
    loading: true,
  });

  useEffect(() => {
    const { token } = match.params;

    const getEmail = async () => {
      try {
        const res = await Axios.get(`/api/users/reset-password/${token}`);

        if (res.data.email && res.data.message === 'Password reset link ok') {
          setFormData({ ...formData, email: res.data.email, tokenValid: true, loading: false });
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

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

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
    <Fragment>
      <h1 className="large text-primary">Reset Password</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Change Your Password
      </p>
      {error ? (
        <p>Connection problem occurred!</p>
      ) : loading ? (
        <Spinner></Spinner>
      ) : tokenValid ? (
        <form className="form" onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={e => onChange(e)}
              minLength="6"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              name="password2"
              value={password2}
              onChange={e => onChange(e)}
              minLength="6"
            />
          </div>
          <input type="submit" className="btn btn-primary" value="Submit" />
        </form>
      ) : (
        <p>Token is not valid</p>
      )}
    </Fragment>
  );
};

ResetPassword.propTypes = {
  setAlert: PropTypes.func.isRequired,
  updatePasswordViaEmail: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(
  mapStateToProps,
  { setAlert, updatePasswordViaEmail },
)(ResetPassword);
