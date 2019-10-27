import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ProfileFollowing from './ProfileFollowing';

const ProfileAbout = ({
  profile: {
    following,
    friendship,
    bio,
    skills,
    user: { name }
  }
}) => (
  <div className="profile-about bg-light p-2">
    {bio && (
      <Fragment>
        <h2 className="text-primary">{name.trim().split(' ')[0]}'s Bio</h2>
        <p>{bio}</p>
        <div className="line"></div>
      </Fragment>
    )}

    <h2 className="text-primary">Skill Set</h2>
    <div className="skills">
      {skills.map((skill, index) => (
        <div key={index} className="p-1">
          <i className="fa fa-check"></i> {skill}
        </div>
      ))}
    </div>

    {following.length > 0 && <ProfileFollowing following={following} />}
  </div>
);

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileAbout;
