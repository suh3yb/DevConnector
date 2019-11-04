import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../redux/actions/authAction';
import { Menu, Container, Responsive } from 'semantic-ui-react';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <Menu.Menu position="right">
      <Menu.Item
        as={Link}
        to="/dashboard"
        icon="dashboard"
        content={<Responsive minWidth={600}>Dashboard</Responsive>}
      />
      <Menu.Item
        as={Link}
        to="/profiles"
        icon="users"
        content={<Responsive minWidth={600}>Profiles</Responsive>}
      />
      <Menu.Item
        as={Link}
        to="/posts"
        icon="sticky note"
        content={<Responsive minWidth={600}>Posts</Responsive>}
      />
      <Menu.Item
        as={Link}
        to="/messages"
        icon="chat"
        content={<Responsive minWidth={600}>Messages</Responsive>}
      />
      <Menu.Item
        as="a"
        href="#!"
        onClick={logout}
        icon="sign out"
        content={<Responsive minWidth={600}>Logout</Responsive>}
      />
    </Menu.Menu>
  );

  const guestLinks = (
    <Menu.Menu position="right">
      <Menu.Item
        as={Link}
        to="/profiles"
        icon="users"
        content={<Responsive minWidth={600}>Profiles</Responsive>}
      />
      <Menu.Item
        header
        as={Link}
        to="/register"
        icon="user plus"
        content={<Responsive minWidth={600}>Register</Responsive>}
      />
      <Menu.Item
        header
        as={Link}
        to="/login"
        icon="key"
        content={<Responsive minWidth={600}>Login</Responsive>}
      />
    </Menu.Menu>
  );

  return (
    <Menu
      inverted
      borderless
      style={{
        backgroundColor: 'rgba(22, 120, 194, 0.9)',
        margin: '0',
        position: 'sticky',
        top: '0',
        zIndex: 999,
        overflowX: 'auto',
      }}
    >
      <Container>
        <Menu.Item
          style={{ fontSize: '1.5rem', fontWeight: '700' }}
          as={Link}
          to="/"
          icon="code"
          content={
            <>
              <Responsive minWidth={720}>HackYourSocial</Responsive>
              <Responsive maxWidth={719}>HYS</Responsive>
            </>
          }
        />
        {!loading && <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>}
      </Container>
    </Menu>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({ auth: state.auth });

export default connect(
  mapStateToProps,
  { logout },
)(Navbar);
