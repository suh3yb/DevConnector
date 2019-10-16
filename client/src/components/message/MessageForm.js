import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { sendMessage } from '../../redux/actions/messageAction';
import { Link } from 'react-router-dom';
import { Form, TextArea, Button, Divider, Header } from 'semantic-ui-react';

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
    <div className="post-form">
      <Header
        as="h3"
        icon="envelope"
        content={`Send Message to ${receiver_name}`}
        subheader="Add any school or bootcamp you have attended"
      />
      <Button
        as={Link}
        to="/profiles"
        icon="arrow left"
        content="Go Back To Profiles"
      />
      <Button
        as={Link}
        to={`/profile/${receiver_id}`}
        icon="user"
        content={`View ${receiver_name}'s Profile`}
      />
      <Divider />
      <Form
        className="form my-1"
        onSubmit={e => {
          e.preventDefault();
          sendMessage(sender_id, receiver_id, text);
          setText('');
        }}>
        <Form.Field>
          <TextArea
            name="text"
            cols="30"
            rows="5"
            placeholder="Your message"
            value={text}
            onChange={e => setText(e.target.value)}
            onKeyDown={onEnterPress}
            required
          />
        </Form.Field>
        <Button primary>Send</Button>
        <Divider />
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
