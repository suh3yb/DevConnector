import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { sendMessage } from '../../redux/actions/messageAction';
import { Form, Button, TextArea } from 'semantic-ui-react';
import useEventListener from '../../utils/useEventListener';

const MessageForm = ({ auth, receiver_id, sendMessage }) => {
  const [text, setText] = useState('');
  const sender_id = auth.user._id;

  const onSubmit = e => {
    if (
      (e.keyCode === 13 && e.shiftKey === false) ||
      e.constructor.name === 'SyntheticEvent'
    ) {
      e.preventDefault();
      sendMessage(sender_id, receiver_id, text);
      setText('');
    }
  };

  useEventListener('keypress', onSubmit);

  return (
    <Form onSubmit={onSubmit}>
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
