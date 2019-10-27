import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import PostItem from './PostItem';
import PostForm from './PostForm';
import { getPosts, toggleFilter } from '../../redux/actions/postAction';
import { getCurrentProfile } from '../../redux/actions/profileAction';
import PostNotification from '../layout/PostNotification';

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
    postsToShow = posts.filter(post => friendIds.indexOf(post.user._id) !== -1);
  }

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <PostNotification />
      <h1 className="large text-primary">Posts</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome to the community
      </p>
      <PostForm />
      <button className="btn btn-primary" onClick={() => toggleFilter()}>
        {showAll ? 'Show Following' : 'Show All'}
      </button>
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
