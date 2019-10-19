import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../redux/actions/postAction';
import { Form, TextArea, Button, Segment, Header } from 'semantic-ui-react';

const PostForm = ({ addPost }) => {
  const [text, setText] = useState('');

  return (
    <Segment>
      <Header as="h3">Say something...</Header>
      <Form
        className="form my-1"
        onSubmit={e => {
          e.preventDefault();
          addPost({ text });
          setText('');
        }}>
        <Form.Field>
          <TextArea
            name="text"
            cols="30"
            rows="5"
            placeholder="Create a post"
            value={text}
            onChange={e => setText(e.target.value)}
            required
          />
        </Form.Field>
        <Button primary>Submit</Button>
      </Form>
    </Segment>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired
};

export default connect(
  null,
  { addPost }
)(PostForm);
