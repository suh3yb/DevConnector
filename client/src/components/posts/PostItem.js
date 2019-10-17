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
  //create a ref to be able to target the element that has this ref
  //newText to use it to update post text, the initial value of newText is old text
  const [newText , setNewText] = useState(text);
  const inputArea = React.createRef(); 
  const postText = React.createRef();
  const cancelButton = React.createRef();
  const editButton = React.createRef();// return an object with ref inside current property
  const saveButton = React.createRef();
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
        <p ref={postText} className="my-1">{text}</p>
        <textarea
          ref={inputArea}
          className="hide"
          name="text"
          cols="30"
          rows="5"
          value={newText}
          onChange={e => setNewText(e.target.value)}/>
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
                <button ref={editButton} className="btn btn-danger" onClick={() => {
                    editButton.current.classList.add('hide'); //hide edit button
                    saveButton.current.classList.remove('hide');//show save button
                    cancelButton.current.classList.remove('hide');//show cancel button
                    postText.current.classList.add('hide'); //hide post paragraph with old value
                    inputArea.current.classList.remove('hide'); //show inputText with post text - changeinputText.current = document.getElementbyRef
                }}>
                  {/* use icon from fontawesome for button */}
                  <i className="fas fa-edit"></i>
                </button>
                {/* create save button */}
                <button ref={saveButton} className="hide btn btn-danger" onClick={() => {
                    saveButton.current.classList.add('hide'); //hide save button
                    cancelButton.current.classList.add('hide'); // hide cancel button
                    editButton.current.classList.remove('hide'); //show edit button
                    inputArea.current.classList.add('hide'); // hide inputText (user doesn't want to change anymore)
                    postText.current.classList.remove('hide'); //show post paragraph with new value
                    //update post only if there are changes
                    if(newText !== text) {
                      //call editPost from postActions which will send put request to server to update the post in data base 
                      //and update posts in state
                      editPost(_id, {text: newText});
                    }
                }}>
                  <i className="fas fa-save"></i>
                </button>
                {/* create cancel button */}
                <button ref={cancelButton} className="hide btn btn-danger" onClick={() => {
                  setNewText(text); // cancel changes in newText and set it back to text
                  postText.current.classList.remove('hide'); //show post paragraph with old value
                  inputArea.current.classList.add('hide'); //hide inputText (user doesn't want to change anymore)
                  cancelButton.current.classList.add('hide'); //hide cancel button
                  saveButton.current.classList.add('hide'); //hide save button
                  editButton.current.classList.remove('hide'); //show edit button
                }} type="button" >
                  <i className="fas fa-undo"></i>
                </button>
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
