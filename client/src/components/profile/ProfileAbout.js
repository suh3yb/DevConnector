import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ProfileFollowing from './ProfileFollowing';
import ProfileFriendship from './ProfileFriendship';
import { Card } from 'semantic-ui-react';

const ProfileAbout = ({
  profile: {
    following,
    friendship,
    bio,
    user: { name },
  },
}) => (
  <Card>
    {bio && (
      <Fragment>
        <h2 className="text-primary">{name.trim().split(' ')[0]}'s Bio</h2>
        <p>{bio}</p>
        <div className="line"></div>
      </Fragment>
    )}

    {following.length > 0 && <ProfileFollowing following={following} />}
    {friendship.length > 0 && <ProfileFriendship friendship={friendship} />}
  </Card>
);

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileAbout;
