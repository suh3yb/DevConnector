import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { sendMessage } from '../../redux/actions/messageAction';
import { Form, Button, TextArea } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

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
    <div>
      <Form
        className="form my-1"
        onSubmit={e => {
          e.preventDefault();
          sendMessage(sender_id, receiver_id, text);
          setText('');
        }}>
        <Form.Group>
          <Form.Field style={{ flex: 1 }}>
            <TextArea
              rows="2"
              name="text"
              placeholder="Your message"
              value={text}
              onChange={e => setText(e.target.value)}
              required
            />
          </Form.Field>
          <Form.Field>
            <Button circular size="large" primary icon="send" />
          </Form.Field>
        </Form.Group>
      </Form>
    </div>
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
