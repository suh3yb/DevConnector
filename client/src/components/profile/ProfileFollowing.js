import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProfileFollowing = ({ following }) => {
  const [showAll, setShowAll] = useState(false);

  const onClick = () => {
    setShowAll(!showAll);
  };

  const friendsToShow = showAll ? following : following.slice(0, 4);

  return (
    <Fragment>
      <div className="line"></div>
      <h2 className="text-primary">{`${following.length} Following${
        following.length > 1 ? 's' : ''
      }`}</h2>
      <div className="skills">
        {friendsToShow.map((friendObj, index) => (
          <div key={index} className="p-1">
            <Link to={`/profile/${friendObj.user}`}>
              <i className="fa fa-user"></i>{' '}
              {friendObj.name && friendObj.name.trim().split(' ')[0]}
            </Link>
          </div>
        ))}
        {following.length > 4 && (
          <button className="btn btn-light" onClick={() => onClick()}>
            {showAll ? 'See less...' : 'See all...'}
          </button>
        )}
      </div>
    </Fragment>
  );
};

ProfileFollowing.propTypes = {
  following: PropTypes.array.isRequired
};

export default ProfileFollowing;
