
import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Spinner from '../layout/Spinner';
import { getProfiles } from '../../redux/actions/profileAction';
import Conversation from './Conversation';

const ChatList = ({

  getProfiles,
  profile: { profiles, loading },
  auth: { user },
}) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  return loading && user === null ? (
    <Spinner />
  ) : (
      <Fragment>
        <h1 className="large text-primary">Chats Room</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Welcome {user && user.name}
        </p>
        {profiles !== null ? (
          <Conversation />
        ) : null}
      </Fragment>
    );
};

ChatList.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(
  mapStateToProps,
  { getProfiles },
)(ChatList);
