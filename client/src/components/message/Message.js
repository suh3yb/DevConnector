import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import getMessages from '../../redux/actions/messageAction';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import MessageForm from './MessageForm';
import NotFound from '../layout/NotFound';
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:5000');

const Message = ({ getMessages, message: { messages, loading }, auth, match }) => {
  useEffect(() => {
    let currentUser;
    if (auth.user !== null) {
      currentUser = auth.user._id;
    }
    socket.on('incoming', receiverId => {
      if (receiverId === currentUser) {
        getMessages(auth.user._id, match.params.id);
      }
    });
    auth.user && getMessages(auth.user._id, match.params.id);
  }, [getMessages, match.params.id, auth.user]);

  const receiver_id = match.params.id;
  const receiver_name = match.params.name;

  return loading ? (
    <Spinner />
  ) : auth.user._id === receiver_id ? (
    <NotFound />
  ) : (
    <Fragment>
      <div className='comments '>
        {messages[0] === undefined
          ? 'No messages, Lets Send First Message !'
          : messages.map(message => {
              return (
                <p
                  key={message._id}
                  className={auth.user._id === message.sender ? 'lead bg-light' : 'lead'}
                >
                  {message.text}
                </p>
              );
            })}
      </div>
      <MessageForm receiver_id={receiver_id} receiver_name={receiver_name} />
    </Fragment>
  );
};

Message.propTypes = {
  getMessages: PropTypes.func.isRequired,
  message: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  message: state.message,
  auth: state.auth,
});
export default connect(
  mapStateToProps,
  { getMessages },
)(Message);
