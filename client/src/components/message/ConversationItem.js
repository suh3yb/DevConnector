import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ConversationItem = ({ user: { _id, name, avatar } }) => {
  return (
    <div className='profile bg-light'>
      <Link to={`/messages/${_id}/${name.trim().split(' ')[0]}`} className='btn btn-primary'>
        <img src={avatar} alt={name} className='round-img small-img' />
        <h4>{name}</h4>
      </Link>
    </div>
  );
};

ConversationItem.propTypes = {
  user: PropTypes.object.isRequired,
};

export default ConversationItem;
