import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { setAlert } from '../../redux/actions/alertAction';
import { updatePassword } from '../../redux/actions/profileAction';

const UpdatePassword = ({ setAlert, updatePassword, history }) => {
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    newPassword2: '',
  });

  const { oldPassword, newPassword, newPassword2 } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (newPassword !== newPassword2) {
      setAlert('Passwords do not match', 'danger');
    } else if (oldPassword === newPassword) {
      setAlert('New password must be different from the current password', 'danger');
    } else {
      updatePassword({ oldPassword, newPassword }, history);
    }
  };

  return (
    <Fragment>
      <h1 className="large text-primary">Change Password</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Update Your Password
      </p>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input
            type="password"
            placeholder="Current Password"
            name="oldPassword"
            value={oldPassword}
            onChange={e => onChange(e)}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            placeholder="New Password"
            name="newPassword"
            value={newPassword}
            onChange={e => onChange(e)}
            minLength="6"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm New Password"
            name="newPassword2"
            value={newPassword2}
            onChange={e => onChange(e)}
            minLength="6"
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Save" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

UpdatePassword.propTypes = {
  setAlert: PropTypes.func.isRequired,
  updatePassword: PropTypes.func.isRequired,
};

export default connect(
  null,
  { setAlert, updatePassword },
)(UpdatePassword);
