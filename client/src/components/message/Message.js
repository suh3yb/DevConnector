import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import getMessages from '../../redux/actions/messageAction';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import MessageForm from './MessageForm';

const Message = ({ getMessages, message: { messages, loading }, auth, match }) => {
  useEffect(() => {
    auth.user && getMessages(auth.user._id, match.params.id);
  }, [getMessages, match.params.id, auth.user]);
  const receiver_id = match.params.id;
  const receiver_name = match.params.name;

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <MessageForm receiver_id={receiver_id} receiver_name={receiver_name} />

      <div className='comments '>
        {messages.map(message => {
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
