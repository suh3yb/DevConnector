import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import openSocket from 'socket.io-client';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const socket = openSocket('http://localhost:5000');
const NewMessage = ({ auth: { user } }) => {
  const [messageCounter, setMessageCounter] = useState(0);

  useEffect(() => {
    socket.on('incoming', data => {
      if (data === user._id) {
        setMessageCounter(messageCounter + 1);
      }
    });
  }, [messageCounter]);

  const onClick = () => {
    setMessageCounter(0);
  };

  return messageCounter === 0 ? (
    ''
  ) : (
    <div className='hello'>
      <span>you have {messageCounter} new messages. Click here to see </span>
      <Link to='/messages' onClick={() => onClick()}>
        New Messages
      </Link>
    </div>
  );
};

NewMessage.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(NewMessage);
