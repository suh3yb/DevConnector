import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Header, Grid } from 'semantic-ui-react';
import LandingBackground from '../../img/showcase.jpg';

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div
      style={{
        background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9)), url(${LandingBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      }}>
      <Grid
        container
        textAlign="center"
        verticalAlign="middle"
        style={{ height: 'calc(100vh - 60px)' }}>
        <Grid.Row>
          <Grid.Column>
            <Header
              inverted
              textAlign="center"
              as="h1"
              content="Welcome to Hack Your Social"
              subheader="Create a developer profile/portfolio, share posts and get help from
              other developers"
            />
            <div>
              <Button
                icon="user plus"
                as={Link}
                to="/register"
                labelPosition="left"
                size="big"
                primary
                content="Sign Up"
              />
              <Button
                icon="key"
                labelPosition="right"
                as={Link}
                to="/login"
                size="big"
                secondary
                content="Login"
              />
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);
