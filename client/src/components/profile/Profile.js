import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileTop from './ProfileTop';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGithub from './ProfileGithub';
import { getProfileById } from '../../redux/actions/profileAction';
import { Button, Grid, Card, Header, Divider, List } from 'semantic-ui-react';
import ProfileFollowing from './ProfileFollowing';
import ProfileFriendship from './ProfileFriendship';

const Profile = ({
  profile: { profile, loading },
  auth,
  getProfileById,
  match
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);

  return (
    <Fragment>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div style={{ marginBottom: '2rem' }}>
            <Button
              primary
              as={Link}
              to="/profiles"
              icon="arrow left"
              content="Back To Profiles"
            />
            {auth.isAuthenticated &&
              !auth.loading &&
              auth.user._id === profile.user._id && (
                <Button
                  as={Link}
                  to="/edit-profile"
                  icon="edit"
                  content="Edit Profile"
                  primary
                />
              )}
          </div>
          <Grid centered style={{ marginBottom: '1rem' }}>
            <ProfileTop profile={profile} />
          </Grid>

          <Grid
            as={Card.Group}
            stackable
            style={{ marginTop: '1rem' }}
            itemsPerRow="2">
            <Card>
              <Card.Content textAlign="left">
                <Header as="h3" icon="user" content="Follows" />
                <Divider />
                <ProfileFollowing following={profile.following} />
              </Card.Content>
            </Card>

            <Card>
              <Card.Content textAlign="left">
                <Header as="h3" icon="user" content="Friends" />
                <Divider />
                <ProfileFriendship friendship={profile.friendship} />
              </Card.Content>
            </Card>

            <Card>
              <Card.Content textAlign="left">
                <Header as="h3" icon="suitcase" content="Experience" />
                <Divider />
                {profile.experience.length > 0 ? (
                  <List animated selection>
                    {profile.experience.map(experience => (
                      <ProfileExperience
                        key={experience._id}
                        experience={experience}
                      />
                    ))}
                  </List>
                ) : (
                  <h4>No experience credentials</h4>
                )}
              </Card.Content>
            </Card>

            <Card>
              <Card.Content textAlign="left">
                <Header as="h3" icon="graduation cap" content="Education" />
                <Divider />
                {profile.education.length > 0 ? (
                  <List animated selection>
                    {profile.education.map(education => (
                      <ProfileEducation
                        key={education._id}
                        education={education}
                      />
                    ))}
                  </List>
                ) : (
                  <h4>No education credentials</h4>
                )}
              </Card.Content>
            </Card>

            {profile.githubusername && (
              <ProfileGithub username={profile.githubusername} />
            )}
          </Grid>
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getProfileById }
)(Profile);
