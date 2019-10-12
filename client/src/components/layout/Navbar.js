import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../redux/actions/authAction';
import { Menu, Container, Icon, Header } from 'semantic-ui-react';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <Menu.Menu position="right">
      <Menu.Item as={Link} to="/profiles" content="Developers" />
      <Menu.Item as={Link} to="/posts" content="Posts" />
      <Menu.Item as={Link} to="/dashboard" content="Dashboard" icon="user" />
      <Menu.Item
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
      <Menu.Item as={Link} to="/profiles" content="Developers" />
      <Menu.Item as={Link} to="/register" content="Register" />
      <Menu.Item as={Link} to="/Login" content="Login" />
    </Menu.Menu>
  );

  return (
    <Menu fixed="top" inverted borderless>
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
