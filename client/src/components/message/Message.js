import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import getMessages from '../../redux/actions/messageAction';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import MessageForm from './MessageForm';

const Message = ({ getMessages, message: { messages, loading }, auth, match }) => {
  useEffect(() => {
    getMessages(auth.user._id, match.params.id);
  }, [getMessages, match.params.id]);
  const receiver_id = match.params.id;
  const receiver_name = match.params.name;

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className='comments'>
        <p className='lead'>Chat with {receiver_name}</p>
        {messages.map(message => {
          return (
            <p key={message._id} className='lead'>
              {message.text}
            </p>
          );
        })}
      </div>
      <MessageForm receiver_id={receiver_id} />
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
