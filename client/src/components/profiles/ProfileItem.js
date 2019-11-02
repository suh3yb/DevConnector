import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { follow, unfollow } from '../../redux/actions/profileAction';
import {
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest
} from '../../redux/actions/friendRequestAction';
import {
  Card,
  Image,
  Label,
  List,
  Button,
  Icon,
  Header
} from 'semantic-ui-react';

const ProfileItem = ({
  auth,
  requesterObj,
  recipientObj,
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
  unfollow,
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest
}) => {
  const followButton = !currentUserProfile ? null : currentUserProfile.following.find(
      elem => elem.user === _id
    ) ? (
    <Button color="grey" circular size="tiny" onClick={() => unfollow(_id)}>
      Unfollow
    </Button>
  ) : (
    <Button
      color="orange"
      circular
      size="tiny"
      onClick={() => follow(_id, name)}>
      Follow
    </Button>
  );

  const actionButtons = !currentUserProfile
    ? null
    : recipientObj.status === 'requested' && (
        <>
          <Button
            color="teal"
            icon="check"
            onClick={() => acceptFriendRequest(_id)}
          />
          <Button
            color="red"
            icon="times"
            onClick={() => rejectFriendRequest(_id)}
          />
        </>
      );

  const requestButton = currentUser &&
    currentUser._id !== _id &&
    !requesterObj.status &&
    !recipientObj.status && (
      <Button
        primary
        size="tiny"
        circular
        icon="user plus"
        content="Add Friend"
        onClick={() => sendFriendRequest(_id)}
      />
    );

  const statusMessage = (
    <Label
      style={{ transform: 'translateY(-3px)' }}
      pointing="left"
      size="tiny"
      color={
        requesterObj.status === 'requested' || requesterObj.status === 'pending'
          ? 'yellow'
          : requesterObj.status === 'accepted'
          ? 'teal'
          : 'red'
      }>
      {requesterObj.status === 'requested' && 'Request sent!'}
      {requesterObj.status === 'pending' && 'Response pending!'}
      {(requesterObj.status === 'accepted' ||
        recipientObj.status === 'accepted') &&
        'Friend'}
      {requesterObj.status === 'rejected' && 'Request rejected'}
    </Label>
  );

  return (
    <Card raised>
      <Card.Content style={{ paddingLeft: '30%', paddingRight: '30%' }}>
        <Image circular fluid src={imageUrl || avatar} alt={name} />
      </Card.Content>
      <Card.Content>
        <Header textAlign="center" as="h1">
          {name} {currentUser && requesterObj.status && statusMessage}
        </Header>
        <Card.Meta textAlign="center">
          <p>
            <Icon name="suitcase" /> {status}{' '}
            {company && <span> at {company}</span>}
          </p>
          <p>
            <Icon name="location arrow" /> {location && <span>{location}</span>}
          </p>
        </Card.Meta>
      </Card.Content>
      <Card.Content extra textAlign="center">
        <List size="mini" horizontal>
          {skills.slice(0, 4).map((skill, index) => (
            <List.Item key={index}>
              <List.Icon color="teal" name="check" /> {skill}
            </List.Item>
          ))}
        </List>
      </Card.Content>
      <Card.Content textAlign="center">
        <Button
          primary
          size="tiny"
          icon="user"
          circular
          content="Profile"
          as={Link}
          to={`/profile/${_id}`}
        />
        {auth.isAuthenticated &&
          currentUser._id !== _id &&
          requesterObj.status === 'accepted' && (
            <Button
              color="teal"
              size="tiny"
              circular
              as={Link}
              icon="envelope"
              content="Message"
              to={`/messages/${_id}/${name.trim().split(' ')[0]}`}
            />
          )}
        {requestButton}
        {currentUser && _id === currentUser._id ? null : followButton}
        {actionButtons}
      </Card.Content>
    </Card>
  );
};

ProfileItem.propTypes = {
  currentUser: PropTypes.object,
  currentUserProfile: PropTypes.object,
  profile: PropTypes.object.isRequired,
  follow: PropTypes.func.isRequired,
  unfollow: PropTypes.func.isRequired,
  sendFriendRequest: PropTypes.func.isRequired,
  acceptFriendRequest: PropTypes.func.isRequired,
  rejectFriendRequest: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  currentUser: state.auth.user,
  currentUserProfile: state.profile.profile
});

export default connect(
  mapStateToProps,
  {
    follow,
    unfollow,
    sendFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest
  }
)(ProfileItem);
