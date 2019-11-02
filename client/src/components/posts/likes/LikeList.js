import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../like.css';

const LikeList = ({ postId, posts }) => {
  const post = posts.find(post => post._id === postId);
  const likes = post.likes;
  return (
    <ul className="like-list">
      {likes &&
        likes.map(like => {
          return (
            <li key={like._id}>
              <Link to={`/profile/${like.user}`}>{like.name}</Link>
            </li>
          );
        })}
    </ul>
  );
};
const mapStateToProps = state => ({
  posts: state.post.posts
});

export default connect(mapStateToProps)(LikeList);
