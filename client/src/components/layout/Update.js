import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { getUpdate, resetUpdate } from '../../redux/actions/updateAction';
import { getPosts } from '../../redux/actions/postAction';
import { connect } from 'react-redux';
import openSocket from 'socket.io-client';
import JWT from 'jwt-client';

const socket = openSocket('http://localhost:5000');

const Update = ({ resetUpdate, getPosts, update: { length }, getUpdate }) => {
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
  }, [getUpdate, presentUserId]);

  const onClick = () => {
    getPosts();
    resetUpdate();
  };

  return length === 0 ? (
    ''
  ) : (
    <div className="hello">
      <span>you have {length} posts. Click here to see</span>
      <button name="click" onClick={() => onClick()}>
        New Posts
      </button>
    </div>
  );
};
Update.propTypes = {
  update: PropTypes.object.isRequired,
  getUpdate: PropTypes.func.isRequired,
  resetUpdate: PropTypes.func.isRequired
};
const mapStateToProps = state => ({ update: state.update });

export default connect(
  mapStateToProps,
  { getPosts, resetUpdate, getUpdate }
)(Update);
