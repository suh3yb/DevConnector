import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { sendMessage } from '../../redux/actions/messageAction';
import { Form, Button, Input } from 'semantic-ui-react';

const MessageForm = ({ auth, receiver_id, sendMessage }) => {
  const [text, setText] = useState('');
  const sender_id = auth.user._id;
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
            <Input
              size="large"
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
