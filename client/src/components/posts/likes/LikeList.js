import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../like.css';

const LikeList = ({ postId, posts }) => {
  const post = posts.find(post => post._id === postId);
  const likes = post.likes;
  return (
    <div className='like-list'>
      {likes &&
        likes.map(like => {
          return (
            <div key={like._id}>
              <Link to={`/profile/${like.user}`}>{like.name}</Link>
            </div>
          );
        })}
    </div>
  );
};
const mapStateToProps = state => ({
  posts: state.post.posts,
});

export default connect(mapStateToProps)(LikeList);
