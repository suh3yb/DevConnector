import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';
import {
  getCurrentProfile,
  deleteAccount
} from '../../redux/actions/profileAction';
import { Message, Header, Button, Divider, Grid } from 'semantic-ui-react';

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile, loading }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Header
        as="h3"
        icon="dashboard"
        content="DashBoard"
        subheader={`Welcome ${user && user.name}`}
      />
      {profile !== null ? (
        <Fragment>
          <DashboardActions />
          <Grid stackable columns="2" style={{ marginTop: '1rem' }}>
            <Grid.Column>
              <Experience experience={profile.experience} />
            </Grid.Column>
            <Grid.Column>
              <Education education={profile.education} />
            </Grid.Column>
          </Grid>
          <Divider />
          <Button
            icon="user times"
            content="Delete My Account"
            onClick={() => deleteAccount()}
            color="red"
          />
        </Fragment>
      ) : (
        <Fragment>
          <Message>
            You have not yet setup a profile, please add some info
          </Message>
          <Button as={Link} to="/create-profile" primary>
            Create Profile
          </Button>
        </Fragment>
      )}
    </Fragment>
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
