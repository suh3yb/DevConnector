import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import PostItem from './PostItem';
import PostForm from './PostForm';
import { getPosts } from '../../redux/actions/postAction';
import { Header, Grid, Card } from 'semantic-ui-react';

const Posts = ({ getPosts, post: { posts, loading } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <Header
        icon="sticky note"
        content="Posts"
        subheader="Welcome to the community"
      />
      <PostForm />
      <Grid as={Card.Group} style={{ marginTop: '1rem' }}>
        {posts.map(post => (
          <PostItem key={post._id} post={post} />
        ))}
      </Grid>
    </Fragment>
  );
};

Posts.propTypes = {
  post: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPosts }
)(Posts);
