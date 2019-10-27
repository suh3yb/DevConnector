import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { follow, unfollow } from '../../redux/actions/profileAction';

const ProfileItem = ({
  auth,
  currentUser,
  currentUserProfile,
  profile: {
    user: { _id, name, avatar },
    status,
    company,
    location,
    skills,
    imageUrl
  },
  follow,
  unfollow
}) => {
  const followButton = !currentUserProfile ? null : currentUserProfile.friend.find(
      elem => elem.user === _id
    ) ? (
    <button onClick={() => unfollow(_id)} className="btn btn-danger">
      Unfollow
    </button>
  ) : (
    <button onClick={() => follow(_id, name)} className="btn btn-primary">
      Follow
    </button>
  );

  return (
    <div className="profile bg-light">
      <img src={imageUrl || avatar} alt={name} className="round-img" />
      <div>
        <h2>{name}</h2>
        <p>
          {status} {company && <span> at {company}</span>}
        </p>
        <p className="my-1">{location && <span>{location}</span>}</p>
        <Link to={`/profile/${_id}`} className="btn btn-primary">
          View Profile
        </Link>
        {auth.isAuthenticated && currentUser._id !== _id && (
          <Link
            to={`/messages/${_id}/${name.trim().split(' ')[0]}`}
            className="btn btn-primary">
            Send Message
          </Link>
        )}
        {currentUser && _id === currentUser._id ? null : followButton}
      </div>
      <ul>
        {skills.slice(0, 4).map((skill, index) => (
          <li key={index} className="text-primary">
            <i className="fas fa-check"></i> {skill}
          </li>
        ))}
      </ul>
    </div>
  );
};

ProfileItem.propTypes = {
  currentUser: PropTypes.object,
  currentUserProfile: PropTypes.object,
  profile: PropTypes.object.isRequired,
  follow: PropTypes.func.isRequired,
  unfollow: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  currentUser: state.auth.user,
  currentUserProfile: state.profile.profile
});

export default connect(
  mapStateToProps,
  { follow, unfollow }
)(ProfileItem);
