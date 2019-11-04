import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addReaction } from '../../../redux/actions/postAction';
import Emoji from './Emoji';
import '../likes/like.css';
import { Button } from 'semantic-ui-react';

const emojis = require('./emojis');

const ReactionBox = ({ toggle, addReaction, postId }) => {
  const emojisArray = Object.entries(emojis);
  return (
    <Button.Group className="emoji-list" onMouseLeave={() => toggle()}>
      {emojisArray.map(emo => (
        <Emoji
          key={emo[0]}
          symbol={emo[1]}
          onclick={() => {
            addReaction(postId, emo[0]);
            toggle();
          }}></Emoji>
      ))}
    </Button.Group>
  );
};

ReactionBox.propTypes = {
  addReaction: PropTypes.func.isRequired,
  toggle: PropTypes.func
};

export default connect(
  null,
  { addReaction }
)(ReactionBox);
