import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Like = ({ user: { user, name, avatar } }) => {
  return (
    <Link to={`/profile/${user}`}>
      <li className='profile bg-light'>
        <div className='btn btn-primary'>
          {/* <img src={avatar} alt={name} className='round-img sml-img' /> */}
          <p>{name}</p>
        </div>
      </li>
    </Link>
  );
};

Like.propTypes = {
  user: PropTypes.object.isRequired,
};

export default Like;
