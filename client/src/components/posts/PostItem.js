import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addLike, removeLike, deletePost, editPost } from '../../redux/actions/postAction';

const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  editPost,
  auth,
  post: { _id, text, name, avatar, user, likes, comments, date },
  showActions,
}) => {
  const [newText , setNewText] = useState(text);
  const [editing, toggleEditing] = useState(false);
  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${user}`}>
          <img className="round-img" src={avatar} alt={name} />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        {/* post text is newText */}
        { editing ?
          <textarea
            name="text"
            cols="30"
            rows="5"
            value={newText}
            onChange={e => setNewText(e.target.value)}/> 
          : <p className="my-1">{text}</p>
        }
        <p className="post-date">
          Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
        </p>
        {showActions && (
          <Fragment>
            <button onClick={() => addLike(_id)} type="button" className="btn btn-light">
              <i className="fas fa-thumbs-up"></i> {likes.length > 0 && <span>{likes.length}</span>}
            </button>
            <button onClick={() => removeLike(_id)} type="button" className="btn btn-light">
              <i className="fas fa-thumbs-down"></i>
            </button>
            <Link to={`/posts/${_id}`} className="btn btn-primary">
              Discussion{' '}
              {comments.length > 0 && <span className="comment-count">{comments.length}</span>}
            </Link>
            {!auth.loading && user === auth.user._id && (
              <Fragment>
                <button onClick={() => deletePost(_id)} type="button" className="btn btn-danger">
                  <i className="fas fa-trash-alt"></i>
                </button>
                {/* create edit button */} 
                { editing ? 
                  <Fragment>
                    <button className="btn btn-dark" onClick={() => {
                        toggleEditing(!editing);
                        if(newText !== text) {
                          editPost(_id, {text: newText});
                        }
                    }}>
                      <i className="fas fa-save"></i>
                    </button>
                    <button className="btn btn-primary" onClick={() => {
                      toggleEditing(!editing);
                      setNewText(text);
                    }} type="button" >
                      <i className="fas fa-undo"></i>
                    </button>
                  </Fragment>
                :
                  <button className="btn btn-primary" onClick={() => {
                    toggleEditing(!editing);
                  }}>
                    {/* use icon from fontawesome for button */}
                    <i className="fas fa-edit"></i>
                  </button>
                }
              </Fragment>
            )}
          </Fragment>
        )}
      </div>
    </div>
  );
}

PostItem.defaultProps = {
  showActions: true,
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  editPost: PropTypes.func.isRequired,
  showActions: PropTypes.bool,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  { addLike, removeLike, deletePost, editPost },
)(PostItem);
