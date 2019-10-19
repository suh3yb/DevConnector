import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import {
  addLike,
  removeLike,
  deletePost,
  editPost
} from '../../redux/actions/postAction';
import { Card, Image, Button, TextArea, Form } from 'semantic-ui-react';
import PostContent from './PostContent';

const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  editPost,
  auth,
  post: { _id, text, name, avatar, user, likes, comments, date },
  showActions
}) => {
  const [newText, setNewText] = useState(text);
  const [hidden, toggleHidden] = useState(true);

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
          {hidden ? (
            <PostContent source={text} />
          ) : (
            <Form.Field>
              <TextArea
                name="text"
                rows="5"
                value={newText}
                onChange={e => setNewText(e.target.value)}
              />
            </Form.Field>
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

            <Button
              floated="right"
              as={Link}
              to={`/posts/${_id}`}
              labelPosition="left"
              label={comments.length > 0 ? comments.length : 0}
              content="Discussion"
            />
            {!auth.loading && user === auth.user._id && (
              <Button.Group>
                {hidden && (
                  <Button
                    icon="edit"
                    color="blue"
                    onClick={() => {
                      toggleHidden(!hidden);
                    }}
                  />
                )}
                {!hidden && (
                  <>
                    <Button
                      icon="save"
                      color="teal"
                      onClick={() => {
                        if (newText !== text) {
                          editPost(_id, { text: newText });
                        }
                        toggleHidden(!hidden);
                      }}
                    />
                    <Button
                      icon="undo"
                      color="grey"
                      onClick={() => {
                        setNewText(text);
                      }}
                    />
                  </>
                )}
              </Button.Group>
            )}
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
