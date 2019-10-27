import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { getUpdate } from '../../redux/actions/postNotificationAction';
import { getPosts } from '../../redux/actions/postAction';
import { connect } from 'react-redux';
import openSocket from 'socket.io-client';
import JWT from 'jwt-client';
const url = process.env.SOCKET_URL || 'http://localhost:5000';

const socket = openSocket(url);

const PostNotification = ({ getPosts, postNotification: { length }, getUpdate }) => {
  const token = localStorage.token;
  let decoded = '';
  let presentUserId = '';

  if (token) {
    decoded = JWT.read(token);
    presentUserId = decoded.claim.user.id;
  }

  useEffect(() => {
    socket.on('render', data => {
      const { userId } = data;
      if (!(userId === presentUserId)) {
        getUpdate();
      }
    });
    return function cleanup() {
      socket.off();
    };
  });

  const onClick = () => {
    getPosts();
  };

  return length === 0 ? (
    ''
  ) : (
    <div className='post-notification'>
      <span>{length} New posts.</span>
      <a href='#top' onClick={onClick} className='btn btn-light'>
        Click to see
      </a>
    </div>
  );
};
PostNotification.propTypes = {
  postNotification: PropTypes.object.isRequired,
  getUpdate: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({ postNotification: state.postNotification });

export default connect(
  mapStateToProps,
  { getPosts, getUpdate },
)(PostNotification);
