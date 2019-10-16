import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../redux/actions/authAction';
import { Menu, Container } from 'semantic-ui-react';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <Menu.Menu position="right">
      <Menu.Item
        header
        as={Link}
        to="/profiles"
        content="Developers"
        icon="users"
      />
      <Menu.Item
        header
        as={Link}
        to="/posts"
        content="Posts"
        icon="sticky note"
      />
      <Menu.Item
        header
        as={Link}
        to="/messages"
        content="Messages"
        icon="envelope"
      />
      <Menu.Item
        header
        as={Link}
        to="/dashboard"
        content="Dashboard"
        icon="dashboard"
      />
      <Menu.Item
        header
        as="a"
        onClick={logout}
        href="#!"
        icon="sign out alternate"
        content="Logout"
      />
    </Menu.Menu>
  );

  const guestLinks = (
    <Menu.Menu position="right">
      <Menu.Item
        header
        as={Link}
        to="/profiles"
        content="Developers"
        icon="users"
      />
      <Menu.Item header as={Link} to="/register" content="Register" />
      <Menu.Item header as={Link} to="/Login" content="Login" />
    </Menu.Menu>
  );

  return (
    <Menu
      fixed="top"
      inverted
      borderless
      style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}>
      <Container>
        <Menu.Item
          style={{ fontSize: '1.5rem' }}
          as={Link}
          to="/"
          icon="code"
          content="Dev Connector"
          header
        />
        {!loading && (
          <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
        )}
      </Container>
    </Menu>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({ auth: state.auth });

export default connect(
  mapStateToProps,
  { logout }
)(Navbar);
