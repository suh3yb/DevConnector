import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import getMessages from '../../redux/actions/messageAction';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import moment from 'moment';
import Spinner from '../layout/Spinner';
import MessageForm from './MessageForm';
import NotFound from '../layout/NotFound';
import openSocket from 'socket.io-client';
import './Message.css';
const socket = openSocket('http://localhost:5000');

const Message = ({
  getMessages,
  message: { messages, loading },
  auth,
  match
}) => {
  useEffect(() => {
    let currentUser;
    auth.user && getMessages(auth.user._id, match.params.id);
    if (auth.user !== null) {
      currentUser = auth.user._id;
    }
    socket.on('incoming', receiverId => {
      if (receiverId === currentUser) {
        getMessages(auth.user._id, match.params.id);
      }
    });
  }, [match.params.id, auth.user, getMessages]);

  const receiver_id = match.params.id;
  const receiver_name = match.params.name;

  return loading ? (
    <Spinner />
  ) : auth.user._id === receiver_id ? (
    <NotFound />
  ) : (
    <div className="message--wrapper">
      <div className="message--flow">
        {messages[0] === undefined
          ? 'No messages, Lets Send First Message !'
          : messages.map(msg => {
              return (
                msg._id && (
                  <div
                    key={msg._id}
                    className={
                      auth.user._id === msg.sender
                        ? 'message--item message--sender'
                        : 'message--item message--receiver'
                    }>
                    <Moment fromNow className="message--date">
                      {moment.utc(msg.date)}
                    </Moment>
                    <div>{msg.text}</div>
                  </div>
                )
              );
            })}
      </div>
      <MessageForm receiver_id={receiver_id} receiver_name={receiver_name} />
    </div>
  );
};

Message.propTypes = {
  getMessages: PropTypes.func.isRequired,
  message: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  message: state.message,
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { getMessages }
)(Message);
