import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Button, Header, Grid } from 'semantic-ui-react';

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Container>
      <div className="dark-overlay">
        <Grid
          container
          textAlign="center"
          verticalAlign="middle"
          style={{ height: 'calc(100vh - 60px)' }}>
          <Grid.Row>
            <Grid.Column>
              <Header
                textAlign="center"
                as="h1"
                content="Developer Connector"
                subheader="Create a developer profile/portfolio, share posts and get help from
            other developers"
              />
              <div>
                <Button
                  icon="user plus"
                  as={Link}
                  to="/register"
                  size="big"
                  primary
                  content="Sign Up"
                />
                <Button
                  icon="key"
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
    </Container>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);
