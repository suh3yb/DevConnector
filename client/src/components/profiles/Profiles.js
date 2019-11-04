import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';
import Search from './Search';
import { searchProfile } from '../../redux/actions/profileAction';
import { getCurrentProfile, getProfiles } from '../../redux/actions/profileAction';
import { getAllFriendRequests } from '../../redux/actions/friendRequestAction';
import { Menu, Header, Card, Button, Icon } from 'semantic-ui-react';

const Profiles = ({
  currentUser,
  getCurrentProfile,
  getProfiles,
  profile: { profiles, loading, search },
  searchProfile,
  friendRequest,
  getAllFriendRequests,
}) => {
  useEffect(() => {
    getProfiles();
    getCurrentProfile();
    getAllFriendRequests();
  }, [getProfiles, getCurrentProfile, getAllFriendRequests]);

  const { friendRequests } = friendRequest;

  const searchResult = () => {
    const results = profiles.map(profile => {
      const requesterObj =
        (currentUser &&
          friendRequests.find(
            req => req.recipient === profile.user._id && req.requester === currentUser._id,
          )) ||
        {};
      const recipientObj =
        (currentUser &&
          friendRequests.find(
            req => req.recipient === currentUser._id && req.requester === profile.user._id,
          )) ||
        {};

      if (profile.user.name.toLowerCase().includes(search.name.toLowerCase())) {
        return (
          <ProfileItem
            key={profile._id}
            profile={profile}
            user={currentUser}
            requesterObj={requesterObj}
            recipientObj={recipientObj}
          />
        );
      }
      return false;
    });

    return results.filter(item => typeof item === 'object').length ? (
      results
    ) : (
      <h4>No profiles found...</h4>
    );
  };

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Menu secondary stackable>
            <Menu.Item position="left">
              <Header
                color="blue"
                as="h3"
                icon="users"
                content="Developers"
                subheader="Browse and connect with
            developers"
              />
            </Menu.Item>
            <Menu.Item position="right">
              {search && (
                <Button
                  primary
                  style={{ marginRight: '10px' }}
                  icon
                  labelPosition="left"
                  onClick={() => {
                    searchProfile(null);
                  }}
                >
                  <Icon name="arrow left" />
                  Back To Profiles
                </Button>
              )}
              <Search profiles={profiles} />
            </Menu.Item>
          </Menu>

          <Card.Group stackable itemsPerRow={2}>
            {profiles.length > 0 ? (
              !search ? (
                profiles.map(profile => {
                  const requesterObj =
                    (profile &&
                      currentUser &&
                      friendRequests.find(
                        req =>
                          req.recipient === profile.user._id && req.requester === currentUser._id,
                      )) ||
                    {};
                  const recipientObj =
                    (profile &&
                      currentUser &&
                      friendRequests.find(
                        req =>
                          req.recipient === currentUser._id && req.requester === profile.user._id,
                      )) ||
                    {};
                  return (
                    <ProfileItem
                      key={profile._id}
                      profile={profile}
                      user={currentUser}
                      requesterObj={requesterObj}
                      recipientObj={recipientObj}
                    />
                  );
                })
              ) : (
                searchResult()
              )
            ) : (
              <h4>No profiles found...</h4>
            )}
          </Card.Group>
        </Fragment>
      )}
    </Fragment>
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  friendRequest: PropTypes.object.isRequired,
  getAllFriendRequests: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  profile: state.profile,
  currentUser: state.auth.user,
  friendRequest: state.friendRequest,
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, getProfiles, searchProfile, getAllFriendRequests },
)(Profiles);
