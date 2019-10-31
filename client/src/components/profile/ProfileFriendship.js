import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProfileFriendship = ({ friendship }) => {
  const [showAll, setShowAll] = useState(false);

  const onClick = () => {
    setShowAll(!showAll);
  };

  const friendsToShow = showAll ? friendship : friendship.slice(0, 4);

  return (
    <Fragment>
      <div className="line"></div>
      <h2 className="text-primary">{`${friendship.length} Friend${
        friendship.length > 1 ? 's' : ''
      }`}</h2>
      <div className="skills">
        {friendsToShow.map((friendObj, index) => (
          <div key={index} className="p-1">
            {console.log('friendObj', friendObj)}
            <Link to={`/profile/${friendObj._id}`}>
              <i className="fa fa-user"></i>{' '}
              {friendObj.name && friendObj.name.trim().split(' ')[0]}
            </Link>
          </div>
        ))}
        {friendship.length > 4 && (
          <button className="btn btn-light" onClick={() => onClick()}>
            {showAll ? 'See less...' : 'See all...'}
          </button>
        )}
      </div>
    </Fragment>
  );
};

ProfileFriendship.propTypes = {
  friendship: PropTypes.array.isRequired
};

export default ProfileFriendship;
