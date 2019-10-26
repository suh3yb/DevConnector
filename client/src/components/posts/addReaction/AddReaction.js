import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';

// import { Link } from 'react-router-dom';
import '../like.css';

const Emoji = ({symbol, label}) => (
  <span
      className="emoji"
      role="img"
      aria-label={label ? label : ""}
      aria-hidden={label ? "false" : "true"}
  >
      {symbol}
  </span>
);

const AddReaction = ({postId, posts}) => {  
   const post = posts.find(post => post._id === postId);
   const text = post.text;
   console.log(text);
   const [textEmoji, setText] = useState(text);
    return (
      <Fragment><ul className= 'emoji-list'>
        <Emoji symbol="😀" onClick={() => setText(textEmoji + "😀")}/>
      <Emoji symbol="🐑" label="sheep"/>
      <Emoji symbol="👍"/>
    </ul></Fragment>      
   
  );
};

const mapStateToProps = state => ({
  posts: state.post.posts,
});

export default connect(mapStateToProps)(AddReaction);
