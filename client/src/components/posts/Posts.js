import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import PostItem from './PostItem';
import PostForm from './PostForm';
import { getPosts, toggleFilter } from '../../redux/actions/postAction';
import { Header, Grid, Card, Button } from 'semantic-ui-react';
import { getCurrentProfile } from '../../redux/actions/profileAction';
import Update from '../layout/Update';

const Posts = ({
  getCurrentProfile,
  getPosts,
  toggleFilter,
  post: { posts, loading, showAll },
  profile
}) => {
  useEffect(() => {
    getCurrentProfile();
    getPosts();
  }, [getCurrentProfile, getPosts]);

  let friendIds;
  let postsToShow = posts;

  if (profile && !showAll) {
    friendIds = profile.friend.map(friendObj => friendObj.user);
    postsToShow = posts.filter(post => friendIds.indexOf(post.user) !== -1);
  }

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <Header
        icon="sticky note"
        content="Posts"
        subheader="Welcome to the community"
      />
      <Update />
      <PostForm />
      <Button onClick={() => toggleFilter()}>
        {showAll ? 'Show Following' : 'Show All'}
      </Button>
      <Grid as={Card.Group} style={{ marginTop: '1rem' }}>
        {postsToShow.map(post => (
          <PostItem key={post._id} post={post} />
        ))}
      </Grid>
    </Fragment>
  );
};

Posts.propTypes = {
  post: PropTypes.object.isRequired,
  profile: PropTypes.object,
  getPosts: PropTypes.func.isRequired,
  toggleFilter: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  post: state.post,
  profile: state.profile.profile
});

export default connect(
  mapStateToProps,
  { getPosts, toggleFilter, getCurrentProfile }
)(Posts);
