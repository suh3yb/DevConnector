import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import Like from './Like';

const LikeList = ({ postId, posts }) => {
  const post = posts.find(post => post._id === postId);
  const likes = post.likes;
  console.log('likes', likes);
  return !likes[0] ? (
    <h4>No likes yet...</h4>
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Like List</h1>
      <ul>
        {likes &&
          likes.map(like => {
            return <Like key={like._id} user={like} />;
          })}
      </ul>
    </Fragment>
  );
};
const mapStateToProps = state => ({
  posts: state.post.posts,
});

export default connect(mapStateToProps)(LikeList);
