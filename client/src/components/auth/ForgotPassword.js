import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

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
    <Fragment>
      <h1 className="large text-primary">Forgot Password</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Send reset link to your email..
      </p>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Submit" />
      </form>
    </Fragment>
  );
};

ForgotPassword.propTypes = {
  resetPassword: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(
  mapStateToProps,
  { resetPassword },
)(ForgotPassword);
