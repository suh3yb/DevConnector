import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addLike, removeLike, deletePost } from '../../redux/actions/postAction';
import LikeList from './likes/LikeList';
import AddReaction from './addReaction/AddReaction';

import './like.css';

const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  post: { _id, text, name, avatar, user, likes, comments, date },
  showActions,
}) => {  
  const [hover, toggleHover] = useState(false);
  const [click, toggleClick] = useState(false);
  return (
  <div className='post bg-white p-1 my-1'>
    <div>
      <Link to={`/profile/${user}`}>
        <img className='round-img' src={avatar} alt={name} />
        <h4>{name}</h4>
      </Link>
    </div>
    <div>
      <p className='my-1'>{text}</p>
      <p className='post-date'>
        Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
      </p>
      {showActions && (
        <Fragment>
          <button onClick={() => toggleClick(true)} type='button' className='btn-emoji' >
          <i className="far fa-smile"></i> {
            click && <AddReaction postId={_id}/>}
          </button>
          <button onMouseEnter={() => toggleHover(true)} onMouseLeave={() => toggleHover(false)} onClick={() => addLike(_id)} type='button' className='btn btn-light-add' >
            <i className='fas fa-thumbs-up'></i> {likes.length > 0 && <div className= 'like-list-div'><span >{likes.length}</span>{
            hover && <LikeList postId={_id}/>}
            </div> }
          </button>
          <button onClick={() => removeLike(_id)} type='button' className='btn btn-light'>
            <i className='fas fa-thumbs-down'></i>
          </button>
          <Link to={`/posts/${_id}`} className='btn btn-primary'>
            Discussion{' '}
            {comments.length > 0 && <span className='comment-count'>{comments.length}</span>}
          </Link>
          {!auth.loading && user === auth.user._id && (
            <button onClick={() => deletePost(_id)} type='button' className='btn btn-danger'>
              <i className='fas fa-times'></i>
            </button>
          )}       
        </Fragment>
      )}
    </div>
  </div>
)
          };

PostItem.defaultProps = {
  showActions: true,
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  showActions: PropTypes.bool,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  { addLike, removeLike, deletePost },
)(PostItem);
