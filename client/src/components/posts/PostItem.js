import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';

import { Card, Image, Button, Form, TextArea } from 'semantic-ui-react';
import PostContent from './PostContent';
import {
  addLike,
  removeLike,
  deletePost,
  editPost
} from '../../redux/actions/postAction';

const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  editPost,
  auth,
  post: { _id, text, name, avatar, user, likes, comments, date },
  showActions
}) => {
  const [editing, toggleEditing] = useState(false);
  const [editText, setEditText] = useState(text);

  return (
    <Card fluid>
      <Card.Content>
        <Image floated="left" size="big" avatar src={avatar} />
        {!auth.loading && user === auth.user._id && (
          <Button
            floated="right"
            basic
            color="red"
            onClick={() => deletePost(_id)}
            icon="trash"
            circular></Button>
        )}
        <Card.Header as={Link} to={`/profile/${user}`}>
          {name}
        </Card.Header>
        <Card.Meta>
          Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
        </Card.Meta>
      </Card.Content>
      <Card.Content>
        <Card.Description>
          {editing && text ? (
            <Form.Field>
              <TextArea
                name="text"
                cols="30"
                rows="5"
                placeholder="Edit Your Post..."
                value={editText}
                onChange={e => {
                  setEditText(e.target.value);
                  console.log('text-change', editText);
                }}
                required
              />
            </Form.Field>
          ) : (
            <PostContent source={text} />
          )}
        </Card.Description>
      </Card.Content>

      <Card.Content extra>
        {showActions && (
          <Fragment>
            <Button
              onClick={() => addLike(_id)}
              icon="thumbs up"
              labelPosition="left"
              label={likes.length > 0 ? likes.length : 0}
            />
            <Button onClick={() => removeLike(_id)} icon="thumbs down" />

            {!auth.loading && user === auth.user._id && (
              <>
                {editing ? (
                  <Button
                    onClick={() => {
                      editPost(_id, { editText });
                      console.log('text-save', editText);
                      toggleEditing(!editing);
                    }}
                    icon="save"
                    primary
                  />
                ) : (
                  <Button
                    onClick={() => {
                      toggleEditing(!editing);
                    }}
                    icon="edit"
                    color="blue"
                  />
                )}
              </>
            )}

            <Button
              floated="right"
              as={Link}
              to={`/posts/${_id}`}
              labelPosition="left"
              label={comments.length > 0 ? comments.length : 0}
              content="Discussion"
            />
          </Fragment>
        )}
      </Card.Content>
    </Card>
  );
};

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  editPost: PropTypes.func.isRequired,
  showActions: PropTypes.bool
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addLike, removeLike, deletePost, editPost }
)(PostItem);
