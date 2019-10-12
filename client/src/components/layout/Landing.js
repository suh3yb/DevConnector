import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Grid, Header, Button, Message } from 'semantic-ui-react';
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
        background:
          'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(/static/media/showcase.4b31330b.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        margin: 0
      }}>
      {console.log('backgroundImage', backgroundImage)}
      <Grid.Column style={{ color: '#fff' }}>
        <h1>Developer Connector</h1>
        <p>
          Create a developer profile/portfolio, share posts and get help from
          other developers
        </p>
        <div className="buttons">
          <Button as={Link} to="/register" primary>
            Sign Up
          </Button>
          <Button as={Link} to="/login" secondary>
            Login
          </Button>
        </div>
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
