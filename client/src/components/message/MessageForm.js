import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { sendMessage } from '../../redux/actions/messageAction';
import { Link } from 'react-router-dom';

const MessageForm = ({ auth, receiver_id, receiver_name, sendMessage }) => {
  const [text, setText] = useState('');
  const sender_id = auth.user._id;
  return (
    <div className='post-form'>
      <div className='bg-primary p'>
        <h3>Message to {receiver_name}</h3>
      </div>
      <form
        className='form my-1'
        onSubmit={e => {
          e.preventDefault();
          sendMessage(sender_id, receiver_id, text);
          setText('');
        }}
      >
        <textarea
          name='text'
          cols='30'
          rows='5'
          placeholder='Your message'
          value={text}
          onChange={e => setText(e.target.value)}
          required
        ></textarea>
        <input type='submit' className='btn btn-dark my-1' value='Send' />
        <Link to={`/profile/${receiver_id}`} className='btn btn-primary'>
          View {receiver_name}'s Profile
        </Link>
        <Link to='/profiles' className='btn btn-light'>
          Back To Profiles
        </Link>
      </form>
    </div>
  );
};

MessageForm.propTypes = {
  sendMessage: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  { sendMessage },
)(MessageForm);
