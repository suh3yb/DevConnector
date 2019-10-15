import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../redux/actions/postAction';
import { Segment, Header, Form, TextArea, Button } from 'semantic-ui-react';

const CommentForm = ({ postId, addComment }) => {
  const [text, setText] = useState('');

  return (
    <Segment>
      <Header as="h3">Leave a Comment</Header>
      <Form
        className="form my-1"
        onSubmit={e => {
          e.preventDefault();
          addComment(postId, { text });
          setText('');
        }}>
        <Form.Field>
          <TextArea
            name="text"
            cols="30"
            rows="5"
            placeholder="Say something"
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

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired
};

export default connect(
  null,
  { addComment }
)(CommentForm);
