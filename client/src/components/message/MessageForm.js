import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { sendMessage } from '../../redux/actions/messageAction';
import { Form, Button, Input } from 'semantic-ui-react';

const MessageForm = ({ auth, receiver_id, receiver_name, sendMessage }) => {
  const [text, setText] = useState('');
  const sender_id = auth.user._id;

  const onEnterPress = e => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();
      sendMessage(sender_id, receiver_id, text);
      setText('');
    }
  };

  return (
    <Form
      className="message--form"
      onSubmit={e => {
        e.preventDefault();
        sendMessage(sender_id, receiver_id, text);
        setText('');
      }}>
      <div style={{ flexGrow: '1', marginRight: '1rem' }}>
        <Input
          fluid
          size="big"
          style={{ width: '100%' }}
          name="text"
          rows="2"
          placeholder="Your message"
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={onEnterPress}
          required
        />
      </div>
      <div style={{ width: '50px' }}>
        <Button circular icon="send" primary />
      </div>
    </Form>
  );
};

MessageForm.propTypes = {
  sendMessage: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { sendMessage }
)(MessageForm);
