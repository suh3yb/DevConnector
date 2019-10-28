import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import {
  addReaction,
  addLike,
  removeLike,
  deletePost,
  removeReaction,
  editPost,
} from '../../redux/actions/postAction';
import LikeList from './likes/LikeList';
import ReactionBox from './addReaction/ReactionBox';
import './post.css';
import './like.css';
const reactions = require('./addReaction/emojis');

const PostItem = ({
  addReaction,
  addLike,
  removeLike,
  deletePost,
  removeReaction,
  editPost,
  auth,
  post: { _id, text, name, avatar, user, likes, comments, reaction, date },
  showActions,
}) => {
  const [click, toggleClick] = useState(false);
  const [newText, setNewText] = useState(text);
  const [editing, toggleEditing] = useState(true);
  const [hover, toggleHover] = useState(false);

  const reactionArray = Object.entries(reaction);
  const onclick = (postId, emoji, user) => {
    if (emoji[1].filter(e => e.user === user).length > 0) {
      removeReaction(postId, emoji[0]);
    } else {
      addReaction(postId, emoji[0]);
    }
  };

  return (
    <div className='post bg-white p-1 my-1'>
      <div>
        <Link to={`/profile/${user}`}>
          <img className='round-img' src={user.imageUrl || avatar} alt={name} />
          <h4>{name}</h4>
        </Link>
      </div>

      <div>
        {showActions && (
          <>
            {!editing ? (
              <textarea
                name='text'
                cols='30'
                rows='5'
                value={newText}
                onChange={e => setNewText(e.target.value)}
              />
            ) : (
              <p className='my-1'>{text}</p>
            )}
            <Fragment>
              {reactionArray.map(emoji => {
                let dependsClass = '';
                if (emoji[1].filter(e => e.user === auth.user._id).length > 0) {
                  dependsClass = 'reacted';
                }
                return emoji[1].length > 0 ? (
                  <div
                    key={emoji[0]}
                    className={`reaction ${dependsClass}`}
                    onClick={() => onclick(_id, emoji, auth.user._id)}
                  >
                    {reactions[emoji[0]]}
                    {emoji[1].length}
                  </div>
                ) : null;
              })}
            </Fragment>
            <p className='post-date'>
              Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
            </p>

            <i onClick={() => toggleClick(!click)} type='button' className='btn-emoji'>
              <i className='far fa-smile'></i>{' '}
              {click && <ReactionBox toggle={() => toggleClick(false)} postId={_id} />}
            </i>

            <button
              onMouseEnter={() => toggleHover(true)}
              onMouseLeave={() => toggleHover(false)}
              onClick={() => addLike(_id)}
              type='button'
              className='btn btn-light'
            >
              <i className='fas fa-thumbs-up'></i>{' '}
              {likes.length > 0 && (
                <div className='like-list-div'>
                  <span>{likes.length}</span>
                  {hover && <LikeList postId={_id} />}
                </div>
              )}
            </button>
            <button onClick={() => removeLike(_id)} type='button' className='btn btn-light'>
              <i className='fas fa-thumbs-down'></i>
            </button>

            <Link to={`/posts/${_id}`} className='btn btn-primary'>
              Discussion{' '}
              {comments.length > 0 && <span className='comment-count'>{comments.length}</span>}
            </Link>

            {!auth.loading && user._id === auth.user._id && (
              <Fragment>
                <button onClick={() => deletePost(_id)} type='button' className='btn btn-danger'>
                  <i className='fas fa-times'></i>
                </button>

                {!editing ? (
                  <Fragment>
                    <button
                      className='btn btn-dark'
                      onClick={() => {
                        toggleEditing(!editing);
                        if (newText !== text) {
                          editPost(_id, { text: newText });
                        }
                      }}
                    >
                      <i className='fas fa-save'></i>
                    </button>
                    <button
                      className='btn btn-primary'
                      onClick={() => {
                        toggleEditing(!editing);
                        setNewText(text);
                      }}
                      type='button'
                    >
                      <i className='fas fa-undo'></i>
                    </button>
                  </Fragment>
                ) : (
                  <button className='btn btn-primary' onClick={() => toggleEditing(!editing)}>
                    <i className='fas fa-edit'></i>
                  </button>
                )}
              </Fragment>
            )}
          </>
        )}
      </div>
    </div>
  );
};

PostItem.defaultProps = {
  showActions: true,
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  removeReaction: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  showActions: PropTypes.bool,
  addReaction: PropTypes.func.isRequired,
  editPost: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  { addLike, removeLike, deletePost, editPost, removeReaction, addReaction },
)(PostItem);
