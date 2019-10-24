import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Like from './Like';


const LikeList = ({ postId, posts, style }) => {  
  const post = posts.find(post => post._id === postId);
  const likes = post.likes;
  console.log('likes', likes);  
  return (
  // !likes[0] ? (
   // <h4>No likes yet...</h4>
  // ) : (
   // <Fragment>
   //   <h1 className='large text-primary'>Like List</h1>
      <ul>
        {/* {likes &&
          likes.map(like => {
            return <Like key={like._id} user={like} />;
          })} */}
          {likes && likes.map(like => {
            return ( <Link to={`/profile/${like.user}`}>
              <li key={like._id}>
                <img src={like.avatar} alt={like.name} className='round-img sml-img'/>
                {like.name}</li></Link>
          )})}
      </ul>
   // </Fragment>
  );
};
const mapStateToProps = state => ({
  posts: state.post.posts,
});

export default connect(mapStateToProps)(LikeList);
