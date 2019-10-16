import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Card, Image, List, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { follow, unfollow } from '../../redux/actions/profileAction';

const ProfileItem = ({
  currentUser,
  currentUserProfile,
  profile: {
    user: { _id, name, avatar },
    status,
    company,
    location,
    skills
  },
  follow,
  unfollow
}) => {
  const followButton = !currentUserProfile ? null : currentUserProfile.friend.find(
      elem => elem.user === _id
    ) ? (
    <Button secondary onClick={() => unfollow(_id)}>
      Unfollow
    </Button>
  ) : (
    <Button primary onClick={() => follow(_id, name)}>
      Follow
    </Button>
  );

  return (
    <Card raised>
      <Image src={avatar} alt={name} wrapped ui={false} />
      <Card.Content>
        <Card.Header textAlign="center" as="h2">
          {name}
        </Card.Header>
        <Card.Meta textAlign="center">
          {status} {company && <span> at {company}</span>}
        </Card.Meta>
        <Card.Meta textAlign="center">
          {location && <span>{location}</span>}
        </Card.Meta>
        <List>
          {skills.slice(0, 4).map((skill, index) => (
            <List.Item key={index} icon="check" content={skill} />
          ))}
        </List>
      </Card.Content>
      <Card.Content extra>
        <Button as={Link} to={`/profile/${_id}`} icon="user" />
        <Button
          as={Link}
          to={`/messages/${_id}/${name.trim().split(' ')[0]}`}
          icon="envelope"
        />
        {currentUser && _id === currentUser._id ? null : followButton}
      </Card.Content>
    </Card>
  );
};

ProfileItem.propTypes = {
  currentUser: PropTypes.object,
  currentUserProfile: PropTypes.object,
  profile: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  follow: PropTypes.func.isRequired,
  unfollow: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  currentUser: state.auth.user,
  currentUserProfile: state.profile.profile
});

export default connect(
  mapStateToProps,
  { follow, unfollow }
)(ProfileItem);
