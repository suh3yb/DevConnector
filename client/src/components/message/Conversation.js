import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Conversation = ({ user: { _id, name, avatar } }) => {
  return (
    <li className='profile bg-light'>
      <Link to={`/messages/${_id}/${name.trim().split(' ')[0]}`} className='btn btn-primary'>
        <img src={avatar} alt={name} className='round-img' />
        <h4>{name}</h4>
      </Link>
    </li>
  );
};

Conversation.propTypes = {
  user: PropTypes.object.isRequired,
};

export default Conversation;
