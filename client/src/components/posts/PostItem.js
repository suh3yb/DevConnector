import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import PostContent from './PostContent';
import {
  addReaction,
  addLike,
  removeLike,
  deletePost,
  removeReaction,
  editPost
} from '../../redux/actions/postAction';
import LikeList from './likes/LikeList';
import ReactionBox from './addReaction/ReactionBox';
import './post.css';
import './like.css';
import {
  Card,
  Image,
  Grid,
  Dropdown,
  Button,
  Icon,
  Divider,
  Form,
  Label
} from 'semantic-ui-react';
import TextareaAutosize from 'react-textarea-autosize';
const reactions = require('./addReaction/emojis');

const PostItem = ({
  addReaction,
  addLike,
  removeLike,
  deletePost,
  removeReaction,
  editPost,
  auth,
  post: { _id, text, name, avatar, user, likes, comments, reaction, date },
  showActions
}) => {
  const [click, toggleClick] = useState(false);
  const [newText, setNewText] = useState(text);
  const [editing, toggleEditing] = useState(true);
  const [hover, toggleHover] = useState(false);

  const reactionArray = Object.entries(reaction);
  const onclick = (postId, emoji, user) => {
    if (emoji[1].filter(e => e.user === user).length > 0) {
      removeReaction(postId, emoji[0]);
    } else {
      addReaction(postId, emoji[0]);
    }
  };

  return (
    <Card fluid raised style={{ marginBottom: '3rem' }}>
      <Card.Content>
        <Grid columns="2">
          <Grid.Column width="12">
            <Image
              style={{ marginBottom: '0' }}
              avatar
              size="huge"
              floated="left"
              src={user.imageUrl || avatar}
              alt={name}
            />
            <Card.Header style={{ fontSize: '1.2rem', fontWeight: '700' }}>
              <Link to={`/profile/${user._id}`}>{name}</Link>
            </Card.Header>
            <Card.Meta>
              Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
            </Card.Meta>
          </Grid.Column>
          {!auth.loading && user._id === auth.user._id && (
            <Grid.Column width="4" floated="right" textAlign="right">
              <Dropdown floating icon="ellipsis vertical">
                <Dropdown.Menu style={{ right: 0, left: 'auto' }}>
                  <Dropdown.Item
                    icon="edit"
                    text="Edit Post"
                    onClick={() => toggleEditing(!editing)}
                  />
                  <Dropdown.Item
                    icon="trash"
                    text="Delete Post"
                    onClick={() => deletePost(_id)}
                  />
                </Dropdown.Menu>
              </Dropdown>
            </Grid.Column>
          )}
        </Grid>
      </Card.Content>
      <Card.Content>
        {!editing && (
          <Form>
            <Form.Field>
              <TextareaAutosize
                style={{
                  backgroundColor: '#eeeeee',
                  width: '100%',
                  padding: '1rem'
                }}
                name="text"
                rows="5"
                value={newText}
                onChange={e => setNewText(e.target.value)}
              />
              <Divider />
              {!auth.loading && user._id === auth.user._id && !editing && (
                <Button.Group>
                  <Button
                    icon="save"
                    primary
                    content="Save"
                    onClick={() => {
                      toggleEditing(!editing);
                      if (newText !== text) {
                        editPost(_id, { text: newText });
                      }
                    }}
                  />
                  <Button.Or />
                  <Button
                    icon="undo"
                    color="grey"
                    content="Undo"
                    onClick={() => {
                      toggleEditing(!editing);
                      setNewText(text);
                    }}
                  />
                </Button.Group>
              )}
              <Divider />
            </Form.Field>
          </Form>
        )}
        <PostContent source={text} />
        <div style={{ position: 'relative' }}>
          {reactionArray.map(emoji => {
            return emoji[1].length > 0 ? (
              <Label
                circular
                key={emoji[0]}
                className="reaction"
                onClick={() => onclick(_id, emoji, auth.user._id)}>
                {reactions[emoji[0]]}
                {emoji[1].length}
              </Label>
            ) : null;
          })}
          {click && (
            <ReactionBox toggle={() => toggleClick(false)} postId={_id} />
          )}
        </div>
      </Card.Content>

      <Card.Content>
        {showActions && (
          <>
            <Button
              icon="smile"
              basic
              circular
              onClick={() => toggleClick(!click)}
            />
            <Button
              basic
              circular
              icon
              onMouseEnter={() => toggleHover(true)}
              onMouseLeave={() => toggleHover(false)}
              onClick={() => addLike(_id)}>
              <Icon name="thumbs up" />{' '}
              {likes.length > 0 && (
                <div className="like-list-div">
                  <span>{likes.length}</span>
                  {hover && <LikeList postId={_id} />}
                </div>
              )}
            </Button>
            <Button icon basic circular onClick={() => removeLike(_id)}>
              <i className="fas fa-thumbs-down"></i>
            </Button>
            <Button
              floated="right"
              primary
              as={Link}
              to={`/posts/${_id}`}
              className="btn btn-primary">
              Discussion{' '}
              {comments.length > 0 && (
                <span className="comment-count">{comments.length}</span>
              )}
            </Button>
          </>
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
  removeReaction: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  showActions: PropTypes.bool,
  addReaction: PropTypes.func.isRequired,
  editPost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addLike, removeLike, deletePost, editPost, removeReaction, addReaction }
)(PostItem);
