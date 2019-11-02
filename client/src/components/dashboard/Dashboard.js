import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';
import ProfileFollowing from '../profile/ProfileFollowing';
import ProfileFriendship from '../profile/ProfileFriendship';
import {
  getCurrentProfile,
  deleteAccount
} from '../../redux/actions/profileAction';
import {
  Menu,
  Header,
  Button,
  Card,
  Divider,
  Icon,
  Responsive
} from 'semantic-ui-react';

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile, loading }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return loading && !profile ? (
    <Spinner />
  ) : (
    <>
      <Menu secondary>
        <Menu.Item position="left">
          <Header
            as="h3"
            icon="dashboard"
            content="Dashboard"
            subheader={`Welcome ${user && user.name}`}
          />
        </Menu.Item>
        <Menu.Item position="right">
          {profile && <DashboardActions />}
        </Menu.Item>
      </Menu>
      {profile ? (
        <Card.Group doubling itemsPerRow="2">
          <Card>
            <Card.Content>
              <Menu secondary size="tiny">
                <Menu.Item>
                  <Header as="h3">Experience Credentials</Header>
                </Menu.Item>
                <Menu.Item position="right">
                  <Button
                    as={Link}
                    to="/add-experience"
                    size="mini"
                    basic
                    primary
                    circular
                    icon>
                    <Icon name="add" />{' '}
                    <Responsive as="span" minWidth={500}>
                      Add New
                    </Responsive>
                  </Button>
                </Menu.Item>
              </Menu>
              <Divider />
              <Card.Description style={{ overflowX: 'auto' }}>
                <Experience experience={profile.experience} />
              </Card.Description>
            </Card.Content>
          </Card>
          <Card>
            <Card.Content>
              <Menu secondary size="tiny">
                <Menu.Item>
                  <Header as="h3">Education Credentials</Header>
                </Menu.Item>
                <Menu.Item position="right">
                  <Button
                    as={Link}
                    to="/add-education"
                    size="mini"
                    basic
                    primary
                    circular
                    icon>
                    <Icon name="add" />{' '}
                    <Responsive as="span" minWidth={500}>
                      Add New
                    </Responsive>
                  </Button>
                </Menu.Item>
              </Menu>
              <Divider />
              <Card.Description style={{ overflowX: 'auto' }}>
                <Education education={profile.education} />
              </Card.Description>
            </Card.Content>
          </Card>
          <Card>
            <Card.Content>
              <Card.Header>
                {profile.following.length} Following
                {profile.following.length > 1 ? 's' : ''}
              </Card.Header>
              <Divider />
              <Card.Description>
                <ProfileFollowing following={profile.following} />
              </Card.Description>
            </Card.Content>
          </Card>
          <Card>
            <Card.Content>
              <Card.Header>
                {profile.friendship.length} Friend
                {profile.friendship.length > 1 ? 's' : ''}
              </Card.Header>
              <Divider />
              <Card.Description>
                <ProfileFriendship friendship={profile.friendship} />
              </Card.Description>
            </Card.Content>
          </Card>
          <Card>
            <Card.Content>
              <Button
                color="red"
                onClick={() => deleteAccount()}
                icon="user delete"
                content="Delete My Account"
              />
            </Card.Content>
          </Card>
        </Card.Group>
      ) : (
        <Card fluid>
          <Card.Content>
            <p>You have not yet setup a profile, please add some info</p>
            <Button as={Link} to="/create-profile" primary>
              Create Profile
            </Button>
          </Card.Content>
        </Card>
      )}
    </>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount }
)(Dashboard);
