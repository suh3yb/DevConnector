import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGithub from './ProfileGithub';
import { getProfileById } from '../../redux/actions/profileAction';
import { Button, Card, Grid, Header, Divider, List } from 'semantic-ui-react';

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
          <Button
            secondary
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
          <Grid
            style={{ marginTop: '1rem' }}
            as={Card.Group}
            stackable
            columns="2">
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
            <Card>
              <Card.Content>
                <Header as="h2" icon="suitcase" content="Experience" />
                <Divider />
                {profile.experience.length > 0 ? (
                  <List selection animated>
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
              <Card.Content>
                <Header as="h2" icon="graduation cap" content="Education" />
                <Divider />
                {profile.education.length > 0 ? (
                  <List selection animated>
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
