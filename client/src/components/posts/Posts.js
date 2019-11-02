import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import PostItem from './PostItem';
import {
  getPosts,
  toggleFilter,
  addPost
} from '../../redux/actions/postAction';
import { getCurrentProfile } from '../../redux/actions/profileAction';
import PostNotification from '../layout/PostNotification';
import { Menu, Header, Button, Modal, Form } from 'semantic-ui-react';
import TextareaAutosize from 'react-textarea-autosize';

const Posts = ({
  getCurrentProfile,
  getPosts,
  addPost,
  toggleFilter,
  post: { posts, loading, showAll },
  profile
}) => {
  const [text, setText] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getCurrentProfile();
    getPosts();
  }, [getCurrentProfile, getPosts]);

  let friendIds;
  let postsToShow = posts;

  if (profile && !showAll) {
    friendIds = profile.following.map(friendObj => friendObj.user);
    postsToShow = posts.filter(post => friendIds.indexOf(post.user._id) !== -1);
  }

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <PostNotification />
      <Menu stackable secondary>
        <Menu.Item>
          <Header
            color="blue"
            as="h3"
            icon="sticky note"
            content="Posts"
            subheader="Welcome to the community"
          />
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item>
            <Button
              style={{ marginRight: '1rem' }}
              primary
              icon="filter"
              onClick={() => toggleFilter()}
              content={showAll ? 'Show Following' : 'Show All'}
            />
            <Modal
              basic
              open={open}
              trigger={
                <Button
                  onClick={() => setOpen(true)}
                  icon="plus"
                  content="Add Post"
                  primary
                />
              }>
              <Modal.Header>Create a post</Modal.Header>
              <Modal.Content>
                <Form>
                  <Form.Field>
                    <TextareaAutosize
                      minRows={20}
                      placeholder="Create a post"
                      value={text}
                      onChange={e => setText(e.target.value)}
                      required
                    />
                  </Form.Field>
                </Form>
              </Modal.Content>
              <Modal.Actions>
                <Button
                  onClick={() => {
                    setOpen(false);
                  }}>
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    addPost({ text });
                    setText('');
                    setOpen(false);
                  }}
                  primary>
                  Submit
                </Button>
              </Modal.Actions>
            </Modal>
          </Menu.Item>
        </Menu.Menu>
      </Menu>

      <div className="posts">
        {postsToShow.map(post => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    </Fragment>
  );
};

Posts.propTypes = {
  post: PropTypes.object.isRequired,
  profile: PropTypes.object,
  getPosts: PropTypes.func.isRequired,
  addPost: PropTypes.func.isRequired,
  toggleFilter: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  post: state.post,
  profile: state.profile.profile
});

export default connect(
  mapStateToProps,
  { getPosts, toggleFilter, getCurrentProfile, addPost }
)(Posts);
