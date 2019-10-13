import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';
import { getProfiles } from '../../redux/actions/profileAction';
import { Header, Icon, Grid, Card } from 'semantic-ui-react';

const Profiles = ({ getProfiles, profile: { profiles, loading }, user }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Header as="h3">
            <Icon name="connectdevelop" />
            <Header.Content>
              Developers
              <Header.Subheader>
                Browse and connect with developers
              </Header.Subheader>
            </Header.Content>
          </Header>
          <Grid
            as={Card.Group}
            stackable
            columns="4"
            style={{ marginTop: '1rem' }}>
            {profiles.length > 0 ? (
              profiles.map(
                profile =>
                  profile.user && (
                    <ProfileItem key={profile._id} profile={profile} />
                  )
              )
            ) : (
              <h4>No profile found...</h4>
            )}
          </Grid>
        </Fragment>
      )}
    </Fragment>
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfiles }
)(Profiles);
