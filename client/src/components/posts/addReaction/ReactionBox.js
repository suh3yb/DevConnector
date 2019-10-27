import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addReaction } from '../../../redux/actions/postAction';
import Emoji from './Emoji';
import '../likes/like.css';

const emojis = require('./emojis');

const ReactionBox = ({ toggle, addReaction, postId, posts }) => {
  const emojisArray = Object.entries(emojis);
  return (
    <Fragment>
      <ul className='emoji-list'>
        {emojisArray.map(emo => (
          <Emoji
            className='reactions'
            key={emo[0]}
            symbol={emo[1]}
            onclick={() => {
              addReaction(postId, emo[0]);
              toggle();
            }}
          ></Emoji>
        ))}
      </ul>
    </Fragment>
  );
};

ReactionBox.propTypes = {
  addReaction: PropTypes.func.isRequired,
  toggle: PropTypes.func,
};

export default connect(
  null,
  { addReaction },
)(ReactionBox);
