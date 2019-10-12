import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { getUpdate, resetUpdate } from '../../redux/actions/updateAction';
import { getPosts } from '../../redux/actions/postAction';
import { connect } from 'react-redux';
import openSocket from 'socket.io-client';
import JWT from 'jwt-client';
import { Message, Button, Transition } from 'semantic-ui-react';

const socket = openSocket('http://localhost:5000');

const Update = ({ resetUpdate, getPosts, update: { length }, getUpdate }) => {
  const token = localStorage.token;

  let decoded = '';
  let presentUserId = '';

  if (token) {
    decoded = JWT.read(token);
    presentUserId = decoded.claim.user.id;
  }
  console.log(socket.id);

  useEffect(() => {
    socket.on('render', data => {
      const { userId } = data;
      if (!(userId === presentUserId)) {
        getUpdate();
        console.log(userId, presentUserId);
      }
    });
  }, [getUpdate, presentUserId]);

  const onClick = () => {
    getPosts();
    resetUpdate();
  };

  return (
    <Transition.Group animation="fade down" duration="1000">
      {length > 0 && (
        <Message success>
          <Message.Header>New Post</Message.Header>
          <Message.Content>
            You have {length} new {length > 1 ? 'posts' : 'post'}{' '}
            <Button primary size="tiny" post onClick={() => onClick()}>
              Show
            </Button>
          </Message.Content>
        </Message>
      )}
    </Transition.Group>
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
