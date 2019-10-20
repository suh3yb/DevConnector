import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProfileFriend = ({ friend }) => {
  const [showAll, setShowAll] = useState(false);

  const onClick = () => {
    setShowAll(!showAll);
  };

  const friendsToShow = showAll ? friend : friend.slice(0, 4);

  return (
    <Fragment>
      <div className="line"></div>
      <h2 className="text-primary">{`${friend.length} Friend${friend.length > 1 ? 's' : ''}`}</h2>
      <div className="skills">
        {friendsToShow.map((friendObj, index) => (
          <div key={index} className="p-1">
            <Link to={`/profile/${friendObj.user}`}>
              <i className="fa fa-user"></i> {friendObj.name.trim().split(' ')[0]}
            </Link>
          </div>
        ))}
        {friend.length > 4 && (
          <button className="btn btn-light" onClick={() => onClick()}>
            {showAll ? 'See less...' : 'See all...'}
          </button>
        )}
      </div>
    </Fragment>
  );
};

ProfileFriend.propTypes = {
  friend: PropTypes.array.isRequired,
};

export default ProfileFriend;
