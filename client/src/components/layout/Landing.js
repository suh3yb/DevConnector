import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Grid, Button } from 'semantic-ui-react';
import backgroundImage from '../../img/showcase.jpg';

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Grid
      textAlign="center"
      verticalAlign="middle"
      style={{
        background: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)), url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        margin: 0
      }}>
      <Grid.Column style={{ color: '#fff' }}>
        <h1 style={{ fontSize: '4rem' }}>Developer Connector</h1>
        <p style={{ fontSize: '1.5rem', width: '70%', margin: '0 auto 3rem' }}>
          Create a developer profile/portfolio, share posts and get help from
          other developers
        </p>
        <>
          <Button size="big" as={Link} to="/register" primary>
            Sign Up
          </Button>
          <Button size="big" as={Link} to="/login" secondary>
            Login
          </Button>
        </>
      </Grid.Column>
    </Grid>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);
