import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../like.css';

const LikeList = ({ postId, posts }) => {  
  const post = posts.find(post => post._id === postId);
  const likes = post.likes;
  console.log('likes', likes);  
  return (
        <ul className= 'like-list'>       
          {likes && likes.map(like => {
            return ( <Link to={`/profile/${like.user}`}>
              <li key={like._id} >
                {/* <img src={like.avatar} alt={like.name} className='round-img sml-img'/> */}
                {like.name}</li></Link>
          )})}
      </ul>   
  );
};
const mapStateToProps = state => ({
  posts: state.post.posts,
});

export default connect(mapStateToProps)(LikeList);
