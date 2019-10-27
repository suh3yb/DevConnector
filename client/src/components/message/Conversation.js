import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Conversation = ({ user: { _id, name, avatar } }) => {
  return (
    <Link to={`/messages/${_id}/${name.trim().split(' ')[0]}`}>
      <li className='profile bg-light'>
        <div className='btn btn-primary'>
          <img src={avatar} alt={name} className='round-img' />
          <h4>{name}</h4>
        </div>
        <h4>Go to your chat history with {name}</h4>
      </li>
    </Link>
  );
};

Conversation.propTypes = {
  user: PropTypes.object.isRequired,
};

export default Conversation;
